import React,{Component} from "react";
import './userInput.css';

export default class UserInput extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    static getDerivedStateFromProps(props,state){
        return {
            algorithm : props.algorithm,
            maze : props.maze,
            speed : props.speed
        }
    }
    
    render  = ()=>{
        return(
            <div id="user-input">
                <span>{this.state.algorithm ? this.state.algorithm.name : ""}</span>
                {/* <span>{this.state.maze ? this.state.maze.name : ""}</span> */}
                <span>{this.state.speed ? this.state.speed.name : ""}</span>
            </div>
        )
    }
};