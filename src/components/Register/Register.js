import React from 'react';

	class Register extends React.Component{
	constructor(){
		super();
		this.state={
			signInEmail:'',
			signInPassword:'',
			signInName:'',
		}
		this.Email='Emailadada';
	}
	onPasswordChange =(event) =>{
		this.setState({signInPassword: event.target.value})
	}
	onNameChange =(event) =>{
		this.setState({signInName: event.target.value})
	}

	onEmailChange = (event) =>{
		this.setState({signInEmail: event.target.value})
	}
	onSubmitSignIn = () =>{
		fetch('https://agile-spire-60137.herokuapp.com/register',{
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
				name: this.state.signInName,
				})
		})
		.then(response => response.json())
		.then(user =>{
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
			else if (user==="email already exist") {
				console.log("email exist");
			}
		})
	}




	render(){
	//const {onRouteChange} = this.props;
	return(
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
		<main className="pa4 black-80">
		  <form className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f4 fw6 ph0 mh0">Register</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="text" 
		        name="name"  
		        id="name"
		        onChange={this.onNameChange}
		        />
		      </div>
		      <div className="mt3">
		        <label id='emailtag' className="db fw6 lh-copy f6" htmlFor="email-address">{this.Email}</label>
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
		        onChange={this.onPasswordChange}
		        />
		      </div>
		    </fieldset>
		    <div className="">
		      <input 
		      onClick={this.onSubmitSignIn}
		      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		      type="button" 
		      value="Register"/>
		    </div>
		  </form>
		</main>
		</article>
		);
}
}
export default Register;