import React from 'react';
import Device from './components/Device/Device';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import {Growl} from 'primereact/components/growl/Growl';
import TopBar from './components/topBar';
import {Global} from './services/Global';

/*const initialState= {
			searchfield:'',
			devices:[
				],
			numdevices: 0,
			route: 'dash',
			user:[],
			key:'',
			URL_SERV:'',
		};*/

		export default class MainScreen extends React.Component{
			constructor(props){
				super(props);
				if(!localStorage.getItem('token') || !localStorage.getItem('user')){
					this.props.history.push("login");
					window.location.reload();
				}
				this.state={
					user: JSON.parse(localStorage.getItem('user')),
					key: JSON.parse(localStorage.getItem('user')).key,
					searchfield:'',
					devices:[
					],
					numdevices: 0,
					route: 'dash',
					actualToken: null,
					URL_SERV: "http://localhost:3000",
				};
				this.growl=Growl;

			}

			componentDidMount(){
				this.setState({numdevices:0})
				this.getData();
				const {searchfield,devices} = this.state;
				const filteredDevices = devices.filter(device =>{
					return device.token.toLowerCase().includes(searchfield.toLowerCase());
				})		
				filteredDevices.map((device,i)=>{
					return(<Device URL_SERV={Global.URL_SERV} key={i} llave={this.state.key} value={i} getData={this.getData} devicename={device.devicename} token={device.token} name={device.name} deleteItem={this.onDeleteToken}/>)
				})

			};

			onChangeRoute = (route,token) =>{
				this.setState({route: route, actualToken: token})
			}

			onRequestToken = () => {
				const email=this.state.user.email;
				fetch(Global.URL_SERV+'/token',{
					method: 'post',
					headers: {'content-type': 'application/json',
					'Authorization': localStorage.getItem('token')
				},
				body: JSON.stringify({
					email: email,
				})
			})
				.then(response => response.json())
				.then(()=>{
					console.log("err email: "+email)
					this.getData()

				})
				return;
			}
			onDeleteToken = (token) => {
		//const email=this.state.user.email;
		console.log("delete: "+token)
		fetch(Global.URL_SERV+'/token',{
			method: 'delete',
			headers: {'content-type': 'application/json',
			'Authorization':localStorage.getItem('token')},
			body: JSON.stringify({
				token: token,
			})
		})
		.then(response => response.json())
		.then(()=>{	
			this.getData()
		})
		return;
	}




	cleanArray=(actual)=>{
		var newArray = [];
		for (var i = 0; i < actual.length; i++) {
			if (actual[i]) {
				newArray.push(actual[i]);
			}
		}
		return newArray;
	}

	getRandomInt=(max)=>{
		return Math.floor(Math.random() * Math.floor(max));
	}
	getData=() =>{
		const email=this.state.user.email;
		console.log("getting data: "+email)
		fetch(Global.URL_SERV+'/tokens/'+email,{
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
	generateDevice=()=>{
		(this.state.numdevices >= 4)
		?this.growl.show({ severity: 'info', summary: 'You only can have 4 devices', detail: 'You have reached the maximun number of devices allowed'})
		:this.growl.show({ severity: 'success', summary: 'You have a new token available', detail: 'Order submitted' }) 
		return 0;
	}

	addItem = ()=>{
		console.log(Global.URL_SERV)
		if(this.state.numdevices<4){
			this.onRequestToken();
		}
		this.getData()
		this.setState({numdevices: this.state.devices.length})
		this.generateDevice();
		return(this.setState({devices: this.state.devices}))
	}
	filter = (e) =>{
		this.setState({searchfield: e.target.value})
		return
	}

	deleteItem = (e) =>{
		let id=e.target.value;
		let devices=this.state.devices;
		delete devices[id];
		devices=this.cleanArray(devices);
		return(this.setState({devices: devices}))
	}

	saysomething=(something)=>{
		this.growl.show({ severity: 'info', summary: something, detail: 'success'})
	}

	render(){
		const {searchfield,devices,numdevices,route} = this.state;
		if(numdevices>0){
			if(this.state.route!='dash'){this.setState({route: 'dash'})}
				this.filteredDevices = devices.filter(device =>{
					return device.token.toLowerCase().includes(searchfield.toLowerCase());
				})
		}else{
			this.filteredDevices=[]
		}

		return(
		<div>
		<Growl ref={(el) => this.growl = el} />
			<TopBar history={this.props.history}/>
			<div className='flex justify-around self-around items-around ma0 pa0 pt3 flex-wrap fl w-100 h-80'>
			{
				this.filteredDevices.map((device,i)=>{
					return(<Device URL_SERV={Global.URL_SERV} getData={this.getData} llave={this.state.key} key={i} value={i} device={device} growl={this.saysomething} deleteItem={this.onDeleteToken}/>)
				})
			}
			</div>
		</div>

		)
	}
}



