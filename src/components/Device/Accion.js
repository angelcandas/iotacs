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
        			<span className="fl w-100">
                        <InputText className="w-79" value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}/>
                        <Button label="" icon="far fa-paper-plane" className='tc p-button-success w-8' onClick={(e) => {this.publish(this.state.value)}}/>
                    </span>
                 {/*   <span>
                        <Button label="Data now" icon="far fa-paper-plane" className='tc p-button-success w-50' onClick={(e) => {this.publish('now')}}/>
                    </span>*/}
        		</div>
        		)}
    }

