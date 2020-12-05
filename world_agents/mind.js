const [LEFT, RIGHT, UP, DOWN, SIT] = [0, 1, 2, 3, 4]

const drawBox = (ctx, x, y, color, S) => {
    ctx.fillStyle = color
    ctx.fillRect(S * x, S * y, S, S)        
}

AB.mind.createAgent = seed => {
    const state = {walls: [], visited: [], me: {}}
    const N = seed  //which is the grid size
    const S = 10 //scale
    state.walls = Array(N).fill(0).map(_ => Array(N).fill(0))
    state.visited = Array(N).fill(0).map(_ => Array(N).fill(-1))
        
    const $ = id => document.getElementById(id)
    if(!$('2dmap')) {
        const map = document.createElement('canvas')
        map.id = '2dmap'
        map.height = map.width = N * S
        map.style.background = 'darkgray'
        map.style.height = map.style.width = N * S + 'px'
        const ctx = map.getContext('2d')
        ctx.fillStyle = 'grey'
        ctx.fillRect(1 * S, 1 * S, N * S - 2 * S, N * S - 2 * S)
        $('runheaderbox').appendChild(map)
    }
    
    for (let i = 0; i < N; i++)
        state.walls[i][0] = state.walls[0][i] = state.walls[i][N - 1] = state.walls[N - 1][i] = 1

    state.N = N
    state.S = S

    return {getAction: pos => {
        const myPos = pos.filter(a => a.me)[0]
        const others = pos.filter(a => !a.me)
        const meX = myPos.x, meY = myPos.y
        const {visited, walls, N, S, me } = state
        
        visited[meY][meX]++
        
        if(!me.hasMoved) {
            me.hasMoved = true
            me.x = meX
            me.y = meY
            return me.action = LEFT
        }
        for(const a of others) {
            //visited[a.y][a.x] == -1 && 
            visited[a.y][a.x]++

            // threat other agents position as a temporary wall
            walls[a.y][a.x] = 1
        }
    

        
        if(me.x == meX && me.y == meY) { // hasn't moved
            const y = meY + (me.action == UP ? 1 : (me.action == DOWN ? -1 : 0))
            const x = meX + (me.action == LEFT ? -1 : (me.action == RIGHT ? 1 : 0))
    
            walls[y][x] = 1
        }
        const todo = [
            {y: meY, x: meX - 1}, // left
            {y: meY, x: meX + 1}, // right
            {y: meY + 1, x: meX}, // up
            {y: meY - 1, x: meX} // down
        ]
        
        let action = {type: SIT, visited: Infinity}
    
        for(let i = 0; i < todo.length; i++) {
            
            const move = todo[i]
            
            if(walls[move.y][move.x]) continue;
    
            const visit = visited[move.y][move.x]
            if(visit < action.visited) {
                action.type = i
                action.visited = visit
            }
        }
    
        me.x = meX
        me.y = meY
        me.action = action.type
    
        const ctx = $('2dmap').getContext('2d')
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        const MAX_VISITED = Math.max(...visited.map(row => Math.max(...row)))
        for(let y = 0; y < N; y++) {
            for(let x = 0; x < N; x++) {
                walls[y][x] && drawBox(ctx, x, y, 'yellow', S)
                visited[y][x] != -1 && drawBox(ctx, x, y, `hsl(192, 90%, ${Math.max(56, parseInt(99 - 99 * visited[y][x] / MAX_VISITED))}%)`, S)
                
            }
        }
        drawBox(ctx, meX, meY, 'green', S)
        
        for(const a of others) {
            drawBox(ctx, a.x, a.y, 'red', S)
            // threat other agents positions as a temporary wall
            walls[a.y][a.x] = 0
        }


        
        return me.action
    }}

    
}

