import React,{Component} from 'react'
import {Growl} from 'primereact/components/growl/Growl';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import image from '../marcaUPVN1.png';
export default class TopBar extends React.Component{
	constructor(){
		super()
		this.state={
			user:JSON.parse(localStorage.getItem('user'))
		}
	}
	render(){
		console.log("la buena ayuda")
		return(	<div>
			<Growl ref={(el) => {this.growl = el; }}></Growl>  
			<div className="top_bar tc">
			<img src={image} alt='UPV' className='logo'/>
			<span className="fl">
			<Button label="Home" icon="fas fa-home" style={{marginLeft:4}} onClick={() => {this.props.history.push('dash',true)}}/>
			<Button label="Help" icon="fas fa-info" style={{marginLeft:4}} onClick={() => {this.props.history.push('help',true)}}/>
			<Button label="Tokens" icon="fas fa-terminal" style={{marginLeft:4}} onClick={() => {this.props.history.push('tokens',true)}}/>
			</span>
			<span className="fl">{'Welcome '+this.state.user.name}</span>
			
			<span className="fl">
			<Button label="Logout" icon="fas fa-sign-out-alt" style={{marginLeft:4}} onClick={() => {localStorage.clear();this.props.history.push('login',true);document.location.reload()}}/>
			<Button label="Add" icon="fas fa-plus" onClick={()=>this.addItem()} />
			</span>
			</div>
			</div>
			)

	}}
