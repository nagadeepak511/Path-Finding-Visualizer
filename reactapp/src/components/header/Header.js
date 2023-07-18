import React from "react";
import './header.css';
import './animate.css';
import Dropdown from "./Dropdown";
import UserInput from '../userInput/UserInput';
import bfs from "../algos/bfs";
import dfs from "../algos/dfs";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            algorithms : [],
            speeds : [],
            mazes : [],
            algorithm : 0,
            speed : 1,
            maze : 0
        }
    }

    static getDerivedStateFromProps(props, state){
        return {algorithms:props.algorithms,speeds:props.speeds,mazes:props.mazes}
    }

    changeAlgo = (algorithm) => {
        this.setState({algorithm});
    }

    changeMaze = (maze) => {
        this.setState({maze});
    }

    changeSpeed = (speed) => {
        this.setState({speed});
    }

    animate = ()=>{
        let order = [], path = [], matrix = JSON.parse(localStorage.getItem('pfv-matrix'));
        if(this.state.algorithm === 0){
            order = bfs(matrix).order;
            path = bfs(matrix).path;
        } else if(this.state.algorithm === 1){
            order = dfs(matrix).order;
            path = dfs(matrix).path;
        }

        for(let i=0;i<matrix.length;i++){
            for(let j=0;j<matrix[i].length;j++){
                let node = document.getElementById(`node-${i}-${j}`);
                let bgCol = 'white';
                if(matrix[i][j] == 1) bgCol = 'gray';
                if(matrix[i][j] == 2) bgCol = 'pink';
                if(matrix[i][j] == 3) bgCol = 'green';
                node.style.backgroundColor = bgCol;
                node.firstChild.style.backgroundColor = bgCol;
                node.firstChild.style.animation = '';
            }
        }

        for(let i=0;i<order.length;i++){
            setTimeout(()=>{
                if(matrix[order[i][0]][order[i][1]] == 2 || matrix[order[i][0]][order[i][1]] == 3) return;
                let node = document.getElementById(`node-${order[i][0]}-${order[i][1]}`).firstChild;
                node.style.backgroundColor = 'cyan';
                node.style.animation = 'bubble';
                node.style.animationDuration = '3s';
            },20/(this.state.speed+1)*i);
        }

        for(let i=0;i<path.length;i++){
            setTimeout(()=>{
                if(matrix[path[i][0]][path[i][1]] == 2 || matrix[path[i][0]][path[i][1]] == 3) return;
                let node = document.getElementById(`node-${path[i][0]}-${path[i][1]}`).firstChild;
                node.style.backgroundColor = 'yellow';
                node.style.animation = 'path';
                node.style.animationDuration = '0.5s';
            },20/(this.state.speed+1)*(order.length + i));
        }
    }

    render(){
        return (<>
        <header>
            <h1>Path finding visualizer</h1>
            <div>
                <button onClick={this.animate}>Visualize</button>
                <button onClick={()=>{document.location.reload()}}>Clear board</button>
                <div id="options-container">
                    <Dropdown name="Algorithms" list={this.state.algorithms} changeValue = {this.changeAlgo} selected={this.state.algorithm}/>
                    <Dropdown name="Speed" list={this.state.speeds} changeValue = {this.changeSpeed} selected={this.state.speed}/>
                    {/* <Dropdown name="Generate Maze" list={this.state.mazes} changeValue = {this.changeMaze} maze={this.state.maze}/> */}
                </div>
            </div>
        </header>
        <UserInput algorithm={this.state.algorithms[this.state.algorithm]} speed={this.state.speeds[this.state.speed]} maze={this.state.mazes[this.state.maze]}/>
        </>);
    }
};

export default Header;