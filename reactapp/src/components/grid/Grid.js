import React,{Component} from "react";
import './grid.css';
import Node from './Node';
import matrixObj from './matrix';

let rows = 15, cols = 55, start = [7,10], dest = [7,45];
let matrix = matrixObj.createMatrix(rows,cols,start,dest);
localStorage.setItem('pfv-matrix',JSON.stringify(matrix));
const WALL = 1;
const START = 2;
const DEST = 3;

export default class Grid extends Component{
    constructor(props){
        super(props);
        this.state = {
            rows,
            cols,
            matrix : matrix,
            mouseClicked : false,
            resetBoard : false
        }
    }

    static getDerivedStateFromProps(props,state){
        if(props.resetBoard != state.resetBoard){
            matrix = matrixObj.createMatrix(rows,cols,start,dest);
            localStorage.setItem('pfv-matrix',JSON.stringify(matrix));
            for(let i=0;i<rows;i++){
                for(let j=0;j<cols;j++){
                    let bgCol = "white";
                    if(i==start[0] && j==start[1]) bgCol = "pink";
                    if(i==dest[0] && j==dest[1]) bgCol = "green";
                    let node = document.getElementById(`node-${i}-${j}`);
                    node.style.backgroundColor = bgCol;
                    node.firstChild.style.backgroundColor = bgCol;
                    node.firstChild.style.animation = '';
                }
            }
        }
        return {matrix,resetBoard:props.resetBoard};
    }

    setMouseClicked = ()=>{
        this.setState({mouseClicked:true})
    }

    setMouseUp = ()=>{
        this.setState({mouseClicked:false})
    }

    toggleWallInMatrix = (row,col)=>{
        if(matrix[row][col] == START || matrix[row][col] == DEST) return;

        let node = document.getElementById(`node-${row}-${col}`);
        node.firstChild.style.backgroundColor = matrix[row][col]==WALL ? "white" : "gray";
        node.style.animationName = 'wall';
        node.style.animationDuration = '0.5s';
        node.style.animationDelay = '0.1s';
        if(matrix[row][col] == WALL) node.style.animationDirection = 'reverse';
        if(matrix[row][col] == 0) {
            matrix[row][col] = WALL;
        }
        else if(matrix[row][col] == WALL) matrix[row][col] = 0;

        localStorage.setItem('pfv-matrix',JSON.stringify(matrix));
    }

    render = ()=>{
        return (<>
            <div id="grid" style={{
                margin: "2rem",
                display: "grid",
                gridTemplateColumns: `repeat(${this.state.cols},1fr)`,
                width : "1240px",
                minWidth : "90%",
                margin : "auto",
            }} onMouseDown={this.setMouseClicked} onMouseUp={this.setMouseUp}>
            {
                this.state.matrix.map((column,x)=>{
                    return <>
                        {
                            column.map((box,y)=>{
                                return <Node row={x} col={y} mouseClicked = {this.state.mouseClicked} toggleWallInMatrix={this.toggleWallInMatrix} isStart={x==start[0]&&y==start[1]} isDest={x==dest[0]&&y==dest[1]} isWall={false}/>
                            })
                        }
                    </>
                })
            }
            </div>
        </>)
    }
};