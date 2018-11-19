import React,{Component} from 'react';
import './Device.css';
import {Card} from 'primereact/components/card/Card';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import {Button} from 'primereact/components/button/Button';
import {Dialog} from 'primereact/components/dialog/Dialog';
import LineChartDemo from './LineChartDemo';
import RadarChartDemo from './RadarChartDemo';
import TempChartDemo  from './TempChartDemo';
import Action  from './Accion';
import mqtt from 'mqtt';
import DeviceForm from './DeviceForm';




let client=null;
export default class Device extends Component {
	constructor(props){
		super(props);
		this.state={
			visible: false,
			data:[],
			lastData:50,
			token:this.props.device.token,
			device:this.props.device,
			URL_SERV:this.props.URL_SERV,
			llave: this.props.llave,
		}
		var settings = {
			keepalive: 500,
			protocolId: 'MQIsdp',
			protocolVersion: 3,
			username:this.props.device.email,
			password:this.props.llave,
		}
//console.log("el pajaro es la: "+this.props.email)
this.etitle="Device editor"
/*'ws://localhost:5200'||*/
client= mqtt.connect('wss://iotacsmqtt.herokuapp.com',settings);
client.subscribe("users/"+this.props.device.email);

client.on("message", (topic, payload) =>{
	try{payload=JSON.parse(payload);
		payload=payload.token;
		const{token}=this.state;
		if(payload===token){
			this.refresh(token)
		}}
		catch(err){console.log("No autorizado")}
	});
}
isVisible = (visibility) =>{
	return visibility ? 'visible' : 'hidden';
}

publish_ws=(mensaje)=>{
	let data={
		message: mensaje,
		token: this.state.token,
		sentido: 'action',
	}
	client.publish(this.state.token+'/'+this.props.device.email, JSON.stringify(data));
	this.props.growl("Message sent to "+this.props.device.name+": "+mensaje)

//console.log("publicando en:"+this.state.token+'/'+this.props.device.email)
}

updates=()=>{
	const token=this.state.token;
//console.log("getting data: "+token)
fetch(this.state.URL_SERV+'/tokendat',{
	method: 'post',
	headers: {'content-type': 'application/json',
	'Authorization': localStorage.getItem('token')
},
body: JSON.stringify({
	token: token,
})
})	
.then(response => response.json())
.then(data =>{
//        	console.log(data[0])
return(this.setState({device:data[0]}))
})
.catch(err=>{
	console.log(err)
})
}

refresh=(token) =>{
	fetch(this.state.URL_SERV+'/'+token,{
		method: 'get',
		headers: {'content-type': 'application/json',
		'Authorization': localStorage.getItem('token')
	},
})
	.then(response => response.json())
	.then(data =>{
		const tempdata=[];
		data.forEach((dato,index)=>{
			tempdata[index]=dato.data;
		})
		this.setState({data:data,
			lastData: tempdata[tempdata.length-1]
		})
		return(tempdata)
	})
	.catch(err=>{
		console.log(err)
	})
}
onDataChange=(data)=>{
	this.setState({data: data})
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
copiartoken=()=> {
	/* Get the text field */
	var copyText = this.state.token;
//		  console.log(copyText)
this.copyToClipboard(copyText)
}
componentDidMount(){
	this.setState({URL_SERV:this.props.URL_SERV})
	this.refresh(this.state.token)
	if(this.props.device.name==='new'){
		this.setState({visible: true})
		this.etitle="NEW device editor"
	}
	this.setState({llave:this.props.llave})

}
onHide=()=>{
	this.setState({visible:false});
	return;
}
render(){
	let icon="";
	let ichart="";
	const {name,units,value,token,measuring,tipo,show1,show6,show4,show5}=this.state.device;
	const {data,lastData}=this.state;
	console.log("Last data: "+lastData)
//console.log(show6)
if (show6.includes('L')) {
	icon=<div id='grafica' className='fl w-70'>
	<LineChartDemo URL_SERV={this.state.URL_SERV} ref={this.child}  token={token} name={name} units={units} data={data} measuring={measuring} tipo={tipo} onDataChange={this.onDataChange}/>
	</div>
}
if (show6.includes('R')) {
	icon=<div id='grafica' className='fl w-70 mt-5'>
	<RadarChartDemo  ref={this.child} datamin={show4} datamax={show5} token={token} name={name} units={units} data={this.state.lastData} measuring={measuring} tipo={tipo} onDataChange={this.onDataChange}/>
	{/*<span className='fl w-70 h-100'><LineChartDemo  URL_SERV={this.state.URL_SERV} ref={this.child}  token={token} name={name} units={units} data={data} measuring={measuring} tipo={tipo} onDataChange={this.onDataChange}/></span>*/}
	</div>
}
if (true) {
	ichart=<div className='fl w-30 flex-column justify-between tl'> 
	<h2 >
	<div className='ma0 f5'>
	<p className='ma0'>Name: {name}</p>
	</div>
	<TempChartDemo  className='tc w-20' visible={show1} token={token} units={units} data={lastData}/>
	</h2>
	<Action className='tc' publish={this.publish_ws} />
	</div>
}
return(
	<div className="Panel">
	<Dialog className="Dialog" header={this.etitle} visible={this.state.visible}  modal={true} onHide={()=>this.setState({visible:false})}>
	<DeviceForm URL_SERV={this.state.URL_SERV} refresh={this.updates} getData={this.props.getData} token={token} device={this.state.device} tipo={'Temperatura'} onHide={this.onHide}/>
	</Dialog>
	{ichart}
	{icon}
	<div>
	<nav className='botones_device' >
	<Button className='relative top-0 right-0 alert' icon="fas fa-refresh" label=''	iconPos="left" value={value} onClick={()=>this.refresh(this.state.token)}/>
	<Button className='relative top-0 right-0 alert' icon="fas fa-edit" 		iconPos="left" value={value} onClick={()=>this.setState({visible:true})}/>
	<Button className='relative top-0 right-0 alert' icon="fas fa-trash"  	iconPos="left" value={value} onClick={()=>this.props.deleteItem(this.state.token)}/>
	</nav>
	</div>
	</div>
	)
}
}




/*RELOAD ASYNC USING MQTT*/

