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
			lastData:[],
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
		console.log("el pajaro es la: "+this.props.email)
		this.etitle="Device editor"
		client= mqtt.connect('ws://iotacsmqtt.herokuapp.com',settings);
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
		console.log(mensaje)
	}

	updates=()=>{
		const token=this.state.token;
		console.log("getting data: "+token)
		fetch(this.state.URL_SERV+'/tokendat',{
            method: 'post',
            headers: {'content-type': 'application/json'},
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
            headers: {'content-type': 'application/json'}
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
		const {devicename,name,units,value,token,measuring,tipo,show1,show6,show3}=this.state.device;
		const {data,lastData}=this.state;
		console.log(show6)
		if (show6.includes('L')) {
		icon=<div className='tc fl w-60 pl5'><div style={{maxWidth: '450px',height: '100px'}}><LineChartDemo URL_SERV={this.state.URL_SERV} ref={this.child}  token={token} name={name} units={units} data={data} measuring={measuring} tipo={tipo} onDataChange={this.onDataChange}/></div></div>
		}
		if (show6.includes('R')) {
		icon=<div className='tc fl w-60 pl5'><div style={{maxWidth: '450px',height: '100px'}}><RadarChartDemo ref={this.child} datamin={-30} datamax={30} token={token} name={name} units={units} data={lastData} measuring={measuring} tipo={tipo} onDataChange={this.onDataChange}/></div></div>
		}
		if (true) {
		ichart=<div> 
				<h2 className='fl w-30 flex-column justify-between tc'>
				<div className='ma0 f5'>
					<p className='ma0'>Name: {name}</p>
				</div>
					<TempChartDemo  className='' visible={show1} token={token} units={units} data={lastData}/>
				</h2>
		</div>
		}


		return(
			<div>
			<Dialog header={this.etitle} visible={this.state.visible}  modal={true} onHide={()=>this.setState({visible:false})}>
				<DeviceForm URL_SERV={this.state.URL_SERV} refresh={this.updates} getData={this.props.getData} token={token} device={this.state.device} tipo={'Temperatura'} onHide={this.onHide}/>
			</Dialog>
			<Card className="ui-card-shadow flex-wrap panel w-50 pb-5" style={{'minWidth': '700px','height': '250px'}}>
				<div className="fl w-100 pa0 ma0 flex-row"><Button className='fl w-20 ' onClick={()=>this.copiartoken()}>Copy token:</Button><p id='myInput' className="fl w-60 pa0 ma0" value={token}>{token}</p></div>
					<div>
						<nav className='relative top-0 right-2' >
							<Button className='absolute top-0 right-2 alert' icon="fa-refresh" 	iconPos="right" value={value} onClick={()=>this.refresh(this.state.token)}/>
							<Button className='absolute top-0 right-3 alert' icon="fa-edit" 		iconPos="right" value={value} onClick={()=>this.setState({visible:true})}/>
							<Button className='absolute top-0 right-0 alert' icon="fa-trash"  	iconPos="right" value={value} onClick={()=>this.props.deleteItem(this.state.token)}/>
						</nav>
					</div>
					{ichart}
					{icon}
					<Action publish={this.publish_ws}/>
			</Card>
			</div>
		)
	}
}




/*RELOAD ASYNC USING MQTT*/

