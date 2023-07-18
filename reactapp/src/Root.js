import React,{Component} from 'react';
import Header from './components/header/Header';
import Grid from './components/grid/Grid';

export default class Root extends Component {
    constructor(props){
        super(props);
        this.state = {
            algorithms : [{id:1,name:"Breadth first search"}, {id:2,name:"Depth first search"}],
            speeds : [{id:1,name:"Slow"}, {id:2,name:"Medium"}, {id:3,name:"Fast"}],
            mazes : [{id:1,name:"Recursive Division"}, {id:2,name:"Recursive Division (Vertical skew)"}, {id:3,name:"Recursive Division (Horizontal skew)"}, {id:4,name:"Basic Random Maze"}, {id:5,name:"Simple Stair Problem"}],
            resetBoard : false
        }
    }

    resetBoard = ()=>{
        this.setState({resetBoard:!this.state.resetBoard});
    }

    render = ()=>{
        return (
            <>
                <Header algorithms={this.state.algorithms} speeds={this.state.speeds} mazes={this.state.mazes} changeAlgo = {this.changeAlgo} changeMaze={this.changeMaze} changeSpeed={this.changeSpeed} onVisualizeClicked={this.visualizeClicked} resetBoard={this.resetBoard}/>
                <Grid resetBoard={this.state.resetBoard}/>
            </>
        )
    }
};