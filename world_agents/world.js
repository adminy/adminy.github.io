AB.clockTick = 0
AB.maxSteps = 20000
AB.world  = {
    gridSize: 64,
    squareSize: 100,
    grid: [],
    agents: [],
    totalAgents: 8
}
const BLOCKPUNISH = 50
const [ACTION_LEFT, ACTION_RIGHT, ACTION_UP, ACTION_DOWN, ACTION_STAYSTILL] = [0, 1, 2, 3, 4]

const TEXTURE_WALL 	= 'uploads/starter/door.jpg'
const TEXTURE_MAZE 	= 'uploads/starter/latin.jpg'
const TEXTURE_AGENT = 'uploads/starter/pacman.jpg'
const TEXTURE_ENEMY = 'uploads/starter/ghost.3.png'
const SOUND_ALARM = 'uploads/starter/air.horn.mp3'
const BOXDENSITY = 0.1
const NOBOXES = Math.trunc(AB.world.gridSize * AB.world.gridSize * BOXDENSITY)
const MAXPOS = AB.world.gridSize * AB.world.squareSize
const SKYCOLOR 	= 0xddffdd
const startRadiusConst = MAXPOS * 0.8
const skyboxConst = MAXPOS * 2
const maxRadiusConst = MAXPOS * 10
ABHandler.MAXCAMERAPOS = skyboxConst * 0.6
ABHandler.GROUNDZERO = true

const downmountain = [ 'xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg' ].map(name => 'dawnmountain-' + name + '.png')
const stsky = [ 'posx', 'negx', 'posy', 'negy', 'posz', 'negz' ].map(name => 'st.' + name + '.jpg')
const SKYBOX_ARRAY = downmountain.map(name => 'uploads/starter/' + name)

const [GRID_BLANK, GRID_WALL, GRID_MAZE] = [0, 1, 2]

const soundAlarm = () => new Audio(SOUND_ALARM).play()
    
var wall_texture, agent_texture, enemy_texture, maze_texture

// enemy and agent position on squares
var ei, ej, ai, aj;

var badsteps;
var goodsteps;

var stuckfor = 0;       // how long the enemy has been stuck - if stuck for a while start making random moves 

const getTreeTex = url => new Promise(whenDone => {
    new THREE.TextureLoader().load(url, texture => whenDone(texture))
})

function loadResources() {
    const res = [TEXTURE_WALL, TEXTURE_AGENT, TEXTURE_ENEMY, TEXTURE_MAZE]
    Promise.all(res.concat(SKYBOX_ARRAY).map(url => getTreeTex(url)))
    .then(textures => {
        textures.forEach(texture => texture.minFilter = THREE.LinearFilter);
        
        [wall_texture, agent_texture, enemy_texture, maze_texture] = textures.slice(0, 4)
        textures.slice(4).forEach((texture, i) => SKYBOX_ARRAY[i] = texture)
        initScene()
    })
}


//--- grid system -------------------------------------------------------------------------------
// my numbering is 0 to gridsize-1

    
function occupied ( i, j ) {		// is this square occupied
    if(AB.world.agents.filter(agent => agent.x == i && agent.y == j).length) return true // variable objects 
    if ( AB.world.grid[i][j] == GRID_WALL ) return true		// fixed objects
    if ( AB.world.grid[i][j] == GRID_MAZE ) return true		 
    return false
}
    
// translate my (i,j) grid coordinates to three.js (x,y,z) coordinates
// logically, coordinates are: y=0, x and z all positive (no negative)    
// logically my dimensions are all positive 0 to MAXPOS
// to centre everything on origin, subtract (MAXPOS/2) from all dimensions 

function translate ( i, j )			
{
    var v = new THREE.Vector3();
    
    v.y =   0 ;    

    v.x = ( i * AB.world.squareSize ) - ( MAXPOS/2 );   		 
    v.z = ( j * AB.world.squareSize ) - ( MAXPOS/2 );   	
    
    return v;
}

function initScene() {
        var i,j, shape, thecube;
        
        AB.world.grid = Array(AB.world.gridSize).fill(0).map(_ => Array(AB.world.gridSize))


    // set up walls
        
        for ( i = 0; i < AB.world.gridSize ; i++ ) 
        for ( j = 0; j < AB.world.gridSize ; j++ ) 
        if ( ( i==0 ) || ( i==AB.world.gridSize-1 ) || ( j==0 ) || ( j==AB.world.gridSize-1 ) )
        {
            AB.world.grid[i][j] = GRID_WALL;		 
            shape    = new THREE.BoxGeometry ( AB.world.squareSize, AB.world.squareSize, AB.world.squareSize );			 
            thecube  = new THREE.Mesh( shape );
            thecube.material = new THREE.MeshBasicMaterial( { map: wall_texture } );
            
            thecube.position.copy ( translate(i,j) ); 		  	// translate my (i,j) grid coordinates to three.js (x,y,z) coordinates 
            ABWorld.scene.add(thecube);
        }
        else 
            AB.world.grid[i][j] = GRID_BLANK;

        
    // set up maze 
    for ( var c=1 ; c <= NOBOXES ; c++ ) {
        i = AB.randomIntAtoB(1,AB.world.gridSize-2);		// inner squares are 1 to gridsize-2
        j = AB.randomIntAtoB(1,AB.world.gridSize-2);
        AB.world.grid[i][j] = GRID_MAZE
        
        shape    = new THREE.BoxGeometry ( AB.world.squareSize, AB.world.squareSize, AB.world.squareSize )
        thecube  = new THREE.Mesh( shape )
        thecube.material = new THREE.MeshBasicMaterial( { map: maze_texture } )

        thecube.position.copy ( translate(i,j) ); 		  	// translate my (i,j) grid coordinates to three.js (x,y,z) coordinates 
        ABWorld.scene.add(thecube);		
    }
            
    const makeAgent = map => {
        const pos = randomPos()
        const shape    = new THREE.BoxGeometry ( AB.world.squareSize, AB.world.squareSize, AB.world.squareSize )
        const box = new THREE.Mesh(shape)
        box.material =  new THREE.MeshBasicMaterial({map})
        ABWorld.scene.add(box)
        drawAgent(box, pos.x, pos.y)
        const agent = {box, ...pos, id: AB.world.agents.length, mind: AB.mind.createAgent(AB.world.gridSize)}
        AB.world.agents.push(agent)
        return agent
    }
    // set up enemy 
    // start in random location
    // makeAgent(enemy_texture)
    for(let i = 0; i < AB.world.totalAgents; i++)
        makeAgent(Math.random() > 0.5 ? agent_texture : enemy_texture)

    var skyGeometry = new THREE.CubeGeometry ( skyboxConst, skyboxConst, skyboxConst )
    var skyMaterial = new THREE.MeshFaceMaterial ( Array(6).fill(0).map((_, i) => new THREE.MeshBasicMaterial({map: SKYBOX_ARRAY[i], side: THREE.BackSide})))
    ABWorld.scene.add(new THREE.Mesh(skyGeometry, skyMaterial))
    ABWorld.render()
    AB.removeLoading()
    AB.runReady = true
}

const randomPos = () => {
    let x, y;
    do {
        x = AB.randomIntAtoB(1,AB.world.gridSize-2);
        y = AB.randomIntAtoB(1,AB.world.gridSize-2);
    }  while ( occupied(x, y) );  	  // search for empty square 
    return {x, y}
}

// --- draw moving objects -----------------------------------

const drawAgent = (agent, x, y) => agent.position.copy ( translate(x, y) )		  	// translate my (i,j) grid coordinates to three.js (x,y,z) coordinates 

// --- take actions -----------------------------------

const moveLogicalAgent = agent => {			// this is called by the infrastructure that gets action a from the Mind 
    let x = agent.x
    let y = agent.y
    const a = agent.mind.getAction(AB.world.getState(agent))


        if ( a == ACTION_LEFT ) 	x--;
    else if ( a == ACTION_RIGHT ) 	x++;
    else if ( a == ACTION_UP ) 	    y++;
    else if ( a == ACTION_DOWN ) 	y--;

    if ( ! occupied(x, y) )  {
        agent.x = x
        agent.y = y
    }
}

const span1 = document.createElement('span')
const span2 = document.createElement('span')
const span3 = document.createElement('span')
const controlPanel = document.getElementById('runheaderbox')
controlPanel.appendChild(span1)
controlPanel.appendChild(span2)
controlPanel.appendChild(span3)
controlPanel.appendChild(document.createElement('br'))

// --- score: -----------------------------------
// const badstep = () => Math.abs(ei - ai) < 2 && Math.abs(ej - aj) < 2
const agentBlocked = () => occupied(ai - 1, aj) && occupied(ai + 1, aj) && occupied(ai, aj + 1) && occupied(ai, aj - 1)
// const updateStatusBefore = a => span1.innerHTML = `Step: ${AB.step} &nbsp; x = (${AB.world.getState()}) &nbsp; a = (${a}) `
// const updateStatusAfter = () => span2.innerHTML = ` &nbsp; y = (${AB.world.getState()}) <BR> Bad steps: ${badsteps} &nbsp; Good steps: ${goodsteps} &nbsp; Score: ${(( goodsteps / AB.step ) * 100).toFixed(2)}% `

//--- public functions / interface / API ----------------------------------------------------------

AB.world.newRun = () => {
    AB.loadingScreen()
    AB.runReady = false
    badsteps = 0
    goodsteps = 0
    ABWorld.init3d ( startRadiusConst, maxRadiusConst, SKYCOLOR  )
    loadResources()
    return AB.world.gridSize
}

AB.world.getState = agent => AB.world.agents.map(a => a == agent ? ({me: true, x: a.x, y: a.y}) : ({x: a.x, y: a.y})) //[ ai, aj, ei, ej ]

// AB.world.takeAction = a => {
//     updateStatusBefore(a);
//     moveLogicalAgent(a);
//     //AB.step % 2 === 0 && moveLogicalEnemy(getEnemyAction());
//     // badstep() ? badsteps++ : goodsteps++;
//     AB.world.agents.forEach(agent => drawAgent(agent.box, agent.x, agent.y))
//     updateStatusAfter()
//     // if (agentBlocked()) {
//     //     badsteps = badsteps + BLOCKPUNISH
//     //     AB.step = AB.step + BLOCKPUNISH
//     //     span3.innerHTML = ' <br> <font color=red> <B> Agent blocked. ' + BLOCKPUNISH + ' extra bad steps and reset enemy. </B> </font> '
//     //     soundAlarm()
//     //     [ei, ej] = randomPos()
//     // }
// }

AB.world.update = () => {
    AB.world.agents.forEach(agent => {
        moveLogicalAgent(agent)    
        drawAgent(agent.box, agent.x, agent.y)
    })
}
AB.world.endRun = () => span3.innerHTML = ' <br> <font color=green> <B> Run over. </B> </font> '
AB.world.getScore = () => (( goodsteps / AB.maxSteps ) * 100).toFixed(2)

