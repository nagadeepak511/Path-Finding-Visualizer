import React, {Component} from 'react';
import OutsideAlerter from "./OustideAlerter";

export default class Dropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            showList : false,
            list : []
        };
    }

    toggleList = (e)=>{
        let x = this.state.showList;
        this.setState({showList : !x});
    }

    closeList = ()=>{
        this.setState({showList : false});
    }

    static getDerivedStateFromProps = (props,state)=>{
        return {list : props.list ? props.list : [], name : props.name ? props.name : "", code : props.code};
    }

    changeValue = (e)=>{
        this.props.changeValue(e.target.getAttribute('attr')-1);
    }

    render = ()=>{
        return (<OutsideAlerter alertCallback = {this.closeList}>
        <div>
            <button onClick={this.toggleList}>{this.state.name} &#9660;</button>
            {this.state.showList ? <div id="algorithms-container">
                <ul>
                    {
                        this.state.list.map((item)=>{return <li key={item.id}><span attr={item.id} onClick={this.changeValue}>{item.name}</span></li>})
                    }
                </ul>
            </div> : <></>}
        </div>
        </OutsideAlerter>);
    }
};