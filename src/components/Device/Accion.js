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
        			<span>
                        <InputText className="w-40" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}/>
                        <Button label="Action" icon="far fa-paper-plane" className='tc p-button-success w-25' onClick={(e) => {this.publish(this.state.value)}}/>
                    </span>
                    <span>
                        <Button label="Data now" icon="far fa-paper-plane" className='tc p-button-success w-35' onClick={(e) => {this.publish('now')}}/>
                    </span>
        		</div>
        		)}
    }

