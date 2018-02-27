import React from 'react';

export class AddingTask extends React.Component{

	constructor(props){
		super(props);
		this.onSubmit=this.onSubmit.bind(this);
	}


	onSubmit(e){
		e.preventDefault();
		let newTask=document.querySelector('input[type=text]').value;
		this.props.updateTasks(newTask);
	}

	render(){
		return(
			<div className='gridMain'>
				<form onSubmit={this.onSubmit} className='addTaskName'>
					<input type='text' autoFocus/>
					<button><i className="material-icons">add_circle</i></button>
					<button onClick={this.props.cancelAdd} type='button'><i className="material-icons">cancel</i></button>
				</form>
			</div>
		);
	}
}