
import React from 'react';
import TopBar from './topBar'
import {Button} from 'primereact/components/button/Button';
import {Card} from 'primereact/components/card/Card';
import {TieredMenu} from 'primereact/components/tieredmenu/TieredMenu';
import items from './helpmenu.jsx'
import {Global} from '../services/Global';
export default class TokenView extends React.Component{
	constructor(){
		super()
		this.state={
			devices: [],
			user: JSON.parse(localStorage.getItem('user')),
			URL_SERV: Global.URL_SERV
		}
		this.getData();
	}
	copyToClipboard=(text)=>{
	var textArea = document.createElement( "textarea" );
	textArea.value = text;
	document.body.appendChild( textArea );
	textArea.select();
	try {
		var successful = document.execCommand( 'copy' );
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	}
	document.body.removeChild( textArea );
	}
	getData= () =>{
		const email=this.state.user.email;
		console.log("getting data: "+email)
		fetch(this.state.URL_SERV+'/tokens/'+email,{
			method: 'get',
			headers: {'content-type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
	})
		.then(response => response.json())
		.then(data =>{    		
			console.log(data)
			return(this.setState({devices:data,numdevices: (data.length||0)}))
		})
		.catch(err=>{
			console.log(err)
		})
	}
	scrollto=(element)=>{

		var elmnt = document.getElementById(element);
		console.log(element)
		/*elmnt.scrollIntoView()*/
	}

	render(){
		const {devices}=this.state;
		const copyToClipboard=this.copyToClipboard;
		let items=new Array(devices.length)
		devices.forEach( function(element, index) {
			let token=element.token
			items[index]=<div className="Panel" key={element.id}><span class="token_span">
			<Button label="Copy token:" className='fl f6' onClick={()=>{copyToClipboard(token)}}>
			</Button>Token: {element.token} Device: {element.name}
				<div>
				<Button label="Edit:"/>
				<Button label="Delete:"/>
				</div>
			</span>
			</div>
			})
		console.log("disp: "+items)
		return(
			<div>
			<TopBar history={this.props.history} />
			<div id="tokens" className="Panel">
			<span><h1>Tokens</h1></span>
			</div>
			{items}
			</div>
			)

	}}