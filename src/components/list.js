import React from 'react';
import {SingleTask} from './single-task';

export class List extends React.Component{

	render(){
		let list=[];
		for(let i in this.props.tasks){
			list.push(
				<SingleTask
					key={this.props.tasks[i][2]}
					tasks={this.props.tasks}
					i={i}
					isAdding={this.props.isAdding}
					isGlobalEditing={this.props.isGlobalEditing}
					globalEditingToggle={this.props.globalEditingToggle}
					updateTasks={this.props.updateTasks}
					delete={this.props.delete}
					checkToggle={this.props.checkToggle}
				/>
			);
		}
		return(
			<div className='gridMain'>
				{list}
			</div>
		);
	}
}
