import React,{Component} from 'react';

export default class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            bgCol : "white",
            mouseClicked : false,
            startNode : false,
            destNode : false,
            isWall : false
        }
    }

    static getDerivedStateFromProps(props,state){
        let bgCol = "white";
        if(props.isStart) bgCol = 'pink';
        if(props.isDest) bgCol = 'green';
        return {mouseClicked:props.mouseClicked,bgCol,isWall:props.isWall};
    }

    toggleWall = ()=>{
        if(this.state.startNode) return;
        if(this.state.destNode) return;
        if(this.state.mouseClicked){
            this.props.toggleWallInMatrix(this.props.row,this.props.col);
            this.setState({isWall:!this.state.isWall});
        }
    }

    handleMouseDown = ()=>{
        this.toggleWall();
    }

    render = ()=>{
        return <div 
                    style={{aspectRatio:1,backgroundColor:this.state.bgCol}} 
                    id={`node-${this.props.row}-${this.props.col}`}
                    onMouseEnter={this.toggleWall}
                    onMouseDown = {this.handleMouseDown}
                ><div style={{aspectRatio:1,backgroundColor:this.state.bgCol}}>{" "}</div></div>
    }
};