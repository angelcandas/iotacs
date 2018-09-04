import React, { Component } from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
export default class Action extends Component {
        constructor(props){
        	super(props)
        	this.state={
        		value: '',
        	}
            this.publish=this.props.publish;
        }



        render(){
        	return(
        		<div className='tl fl w-100'>
        			<InputText value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}/>
        			<Button label="Action" icon="pi pi-check" className='tc p-button-succes' onClick={(e) => {this.publish(this.state.value)}}/>
        		</div>
        		)}
    }

