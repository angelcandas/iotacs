import React from 'react';


class Token extends React.Component{

	constructor(props){
		super(props);
		this.state={
			email
		}
	}
	onRequestToken = () =>{
		fetch(this.props.URL+'/signin',{
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
				})
		})
		.then(response => response.json())
		.then(user =>{
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}

}
export default Token;

module exports={

}