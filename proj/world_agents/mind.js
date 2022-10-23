const [LEFT, RIGHT, UP, DOWN, SIT] = [0, 1, 2, 3, 4]

AB.mind.createAgent = (seed, drawBox) => {
    const me = {};
    const N = seed  //which is the grid size
    const walls = Array(N).fill(0).map(_ => Array(N).fill(0))
    const visited = Array(N).fill(0).map(_ => Array(N).fill(-1))
    
    for (let i = 0; i < N; i++)
        walls[i][0] = walls[0][i] = walls[i][N - 1] = walls[N - 1][i] = 1

    return {getAction: pos => {
        const myPos = pos.filter(a => a.me)[0]
        const others = pos.filter(a => !a.me)
        const meX = myPos.x, meY = myPos.y
        
        visited[meY][meX]++
        
        if(!me.hasMoved) {
            me.hasMoved = true
            me.x = meX
            me.y = meY
            return me.action = LEFT
        }
        for(const a of others) {
            visited[a.y][a.x] == -1 && 
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

        const MAX_VISITED = Math.max(...visited.map(row => Math.max(...row)))
        for(let y = 0; y < N; y++) {
            for(let x = 0; x < N; x++) {
                walls[y][x] && drawBox(x, y, 'yellow')
                visited[y][x] != -1 && drawBox(x, y, `hsl(192, 90%, ${~~(45 + (1 - visited[y][x] / MAX_VISITED) * 55)}%)`)
            }
        }
        drawBox(meX, meY, 'green')
        
        for(const a of others) {
            drawBox(a.x, a.y, 'red')
            // threat other agents positions as a temporary wall
            walls[a.y][a.x] = 0
        }


        
        return me.action
    }}

    
}

