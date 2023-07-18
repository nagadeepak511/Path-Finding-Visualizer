let dfs = (matrix)=>{
    let q = [], order = [], grid = [], parent = [];
    let dest = [-1,-1];
    
    for(let i=0;i<matrix.length;i++){
        grid.push([]);
        parent.push([]);
        for(let j=0;j<matrix[0].length;j++){
            grid[i].push(0);
            if(matrix[i][j] == 2) q.push([i,j]);
            if(matrix[i][j] == 3) dest = [i,j];
            parent[i].push(-1);
        }
    }
    
    let getNeighbours = (pos)=>{
        let neigh = [];
        if(pos[0]>0 && matrix[pos[0]-1][pos[1]] != 1) neigh.push([pos[0]-1,pos[1]]);
        if(pos[0]<matrix.length-1 && matrix[pos[0]+1][pos[1]] != 1) neigh.push([pos[0]+1,pos[1]]);
        if(pos[1]>0 && matrix[pos[0]][pos[1]-1] != 1) neigh.push([pos[0],pos[1]-1]);
        if(pos[1]<matrix[0].length-1 && matrix[pos[0]][pos[1]+1] != 1) neigh.push([pos[0],pos[1]+1]);

        return neigh;
    }

    while(q.length > 0) {
		let current = q[q.length-1];
        q.pop();
        order.push(current);
        grid[current[0]][current[1]] = 1;
        if(current[0] == dest[0] && current[1] == dest[1]) break;

        if(current[1] == dest[0] && current[1] == dest[1]) break;

		for(let neighbour of getNeighbours(current)) {
			if (grid[neighbour[0]][neighbour[1]] == 0) {
				q.push(neighbour);
                parent[neighbour[0]][neighbour[1]] = current;
			}
		}
	}

    let path = [];
    while(dest != -1){
        path.push(dest);
        dest = parent[dest[0]][dest[1]];
    }

    return {order,path};
}

export default dfs;