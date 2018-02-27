import React from 'react';
import {CheckBox} from './check-box';
import shortid from 'shortid';

export class SingleTask extends React.Component{

	constructor(props){
		super(props);
		this.state={
			isEditing: false
		}
		this.editOn=this.editOn.bind(this);
		this.editOff=this.editOff.bind(this);
		this.save=this.save.bind(this);
	}

	editOn(){
		if(this.props.isAdding){
			alert('You must finish adding current task before editing another one');
		}else if(this.props.isGlobalEditing){
			alert('You can edit only one task at a time');
		}else{
			this.setState({isEditing: true});
			this.props.globalEditingToggle();
		}
	}

	editOff(){
		this.setState({isEditing: false});
		this.props.globalEditingToggle();
	}

	save(e){
		let newTarget=null;
		if(e.target.className==='material-icons'){
			newTarget=e.target.parentNode;
		}else{
			newTarget=e.target;
		}
		const newText=newTarget.parentNode.parentNode.querySelector('.editField').value;
		const status=this.props.tasks[newTarget.parentNode.parentNode.id][1];
		const uniqueId=shortid.generate();
		const item=newTarget.parentNode.parentNode.id;
		this.props.updateTasks([newText, status, uniqueId],item);
		this.editOff();
	}

	render(){
		if(this.state.isEditing){
			return (
			<div id={this.props.i} className='taskContainer'>
				<label className='check'>
					<CheckBox tasks={this.props.tasks} checkToggle={this.props.checkToggle} nodeId={this.props.i}/>
					<span className='checkmark'></span>
				</label>
				<input type='text' defaultValue={this.props.tasks[this.props.i][0]} className='editField'/>
				<div className='menu'>
					<button onClick={this.save}><i className="material-icons">save</i></button>
					<button onClick={this.editOff}><i className="material-icons">cancel</i></button>
				</div>
			</div>
			);
		}else{
			return (
			<div id={this.props.i} className='taskContainer'>
				<label className='check'>
					<CheckBox tasks={this.props.tasks} checkToggle={this.props.checkToggle} nodeId={this.props.i}/>
					<span className='checkmark'></span>
				</label>
				<span className='main'>{this.props.tasks[this.props.i][0]}</span>
				<div className='menu'>
					<button onClick={this.editOn}><i className="material-icons">edit</i></button>
					<button onClick={this.props.delete}><i className="material-icons">delete</i></button>
				</div>
			</div>
			);
		}
	}
}