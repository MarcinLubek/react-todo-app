import React from 'react';
import {AddingTask} from './adding-task';
import {List} from './list';
import shortid from 'shortid';

export class App extends React.Component{

	constructor(props){
		super(props);
		this.state={
			tasks: [['Task no.1',false,'1'],['Task no.2',false,'2'],['Task no.3',false,'3']],
			isAdding: false,
			isGlobalEditing: false
		}
		this.addingToggle=this.addingToggle.bind(this);
		this.globalEditingToggle=this.globalEditingToggle.bind(this);
		this.updateTasks=this.updateTasks.bind(this);
		this.delete=this.delete.bind(this);
		this.checkToggle=this.checkToggle.bind(this);
	}

	addingToggle(){
		if(this.state.isGlobalEditing){
			alert('You must finish editing task before adding a new one.');
		}else{
			let newState=this.state.isAdding===false?true:false;
			this.setState({isAdding: newState});
		}
	}

	globalEditingToggle(){
		let newState=this.state.isGlobalEditing===false?true:false;
		this.setState({isGlobalEditing: newState});
	}

	updateTasks(input,item){
		if(this.state.isAdding){
			this.addingToggle();
			let uniqueId=shortid.generate();
			console.log(uniqueId);
			const updatedTasks=this.state.tasks;
			updatedTasks.push([input, false, uniqueId]);
			this.setState({tasks: updatedTasks});
		}else{
			const updatedTasks=this.state.tasks;
			updatedTasks.splice(item,1,input);
			this.setState({tasks: updatedTasks});
		}
	}

	delete(e){
		let newTarget=null;
		if(e.target.className==='material-icons'){
			newTarget=e.target.parentNode;
		}else{
			newTarget=e.target;
		}
		const item=newTarget.parentNode.parentNode.id;
		const updatedTasks=this.state.tasks;
		updatedTasks.splice(item,1);
		this.setState({tasks: updatedTasks});
	}

	checkToggle(event){
		const item=event.target.parentNode.parentNode.id;
		const updatedTasks=this.state.tasks;
		updatedTasks[item][1]=updatedTasks[item][1]===false?true:false;
		this.setState({tasks: updatedTasks});
	}

	render(){
		if(this.state.isAdding===false){
			return (
				<div className='gridContainer'>
					<div className='gridHeader'>
						<h1 className='title'>Tasks to do</h1>
						<button className='newTask' onClick={this.addingToggle}><i className="material-icons">add_circle</i></button>
					</div>
					<List
						tasks={this.state.tasks}
						isAdding={this.state.isAdding}
						isGlobalEditing={this.state.isGlobalEditing}
						globalEditingToggle={this.globalEditingToggle}
						updateTasks={this.updateTasks}
						delete={this.delete}
						checkToggle={this.checkToggle}
					/>
				</div>
			);
		}else{
			return (
				<div className='gridContainer'>
					<div className='gridHeader'>
						<h1 className='title'>Tasks to do</h1>
					</div>
					<List
						tasks={this.state.tasks}
						isAdding={this.state.isAdding}
						isGlobalEditing={this.state.isGlobalEditing}
						globalEditingToggle={this.globalEditingToggle}
						updateTasks={this.updateTasks}
						delete={this.delete}
						checkToggle={this.checkToggle}
					/>
					<AddingTask updateTasks={this.updateTasks} cancelAdd={this.addingToggle}/>
				</div>
			);
		}
	}
}