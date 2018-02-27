import React from 'react';

export class CheckBox extends React.Component{

	render(){
		let isCompleted=this.props.tasks[this.props.nodeId][1];
		return <input type='checkbox' onClick={this.props.checkToggle} defaultChecked={isCompleted}/>;
	}
}