let createMatrix = (row,col,start,dest)=>{
    let matrix = [];

    for (var i = 0; i < row; i++) {
        matrix[i]=[];
        for (var j = 0; j < col; j++) {
            matrix[i][j] = 0;
        }
    }

    matrix[start[0]][start[1]] = 2;
    matrix[dest[0]][dest[1]] = 3;

    return matrix;
}

export default {createMatrix};