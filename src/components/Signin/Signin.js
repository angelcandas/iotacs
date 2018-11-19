import React from 'react';
import {Button} from 'primereact/components/button/Button';
import { Redirect } from 'react-router-dom'
import {Global} from '../../services/Global';
class Signin extends React.Component{

	constructor(props){
		super(props);
	/*    if(localStorage.getItem('token') && localStorage.getItem('user')){
	      this.props.history.push("dash")
	    }*/
		this.state={
			signInEmail:'',
			signInPassword:'',
		}


	}
	onPasswordChange =(event) =>{
		this.setState({signInPassword: event.target.value})
	}
	redirect = () =>{
		this.props.history.push("/register")
	}
	onEmailChange = (event) =>{
		this.setState({signInEmail: event.target.value})
	}
	onSubmitSignIn = () =>{
		console.log("URL_SERV: "+Global.URL_SERV)
		fetch(Global.URL_SERV+'/signin',{
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
				})
		})
		.then(response => response.json())
		.then(user =>{
			if (user.token) {
				console.log(user)
				/*this.props.loadUser(user.user[0])*/
				localStorage.setItem('token', user.token)
				localStorage.setItem('user', JSON.stringify(user.user[0]))
				this.props.history.push("/dash")
				/*this.props.onRouteChange('home');*/
			}
		})
	}
	render(){
		const {history} = this.props;
	return(
		<div>
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 panel">
		<main className="pa4 ">
		  <form className="measure">
		<h1 className="tc fw7 IOTACS">IoTACS</h1>
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        onChange={this.onEmailChange}
		        />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input 
		        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="password" 
		        name="password"  
		        id="password"
		        onChange={this.onPasswordChange}/>
		      </div>
		    </fieldset>
		    <div className="">
		      <Button 
		      onClick={this.onSubmitSignIn}
		      className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib" 
		      type="button" 
		      label="Sign in"/>
		    </div>
		    <div className="lh-copy mt3">
		    {/*onClick={() => onRouteChange('register')}*/}
		      <p onClick={this.redirect} className="pointer f6 link dim black db">Register</p>
		    </div>
		  </form>
		</main>
		</article>
		</div>
		);
	}
}
export default Signin;