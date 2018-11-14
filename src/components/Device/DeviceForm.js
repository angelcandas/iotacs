import React,{Component} from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import {RadioButton} from 'primereact/components/radiobutton/RadioButton';
export default class DeviceForm extends Component{
	constructor(props){
		super(props)
		this.device = this.props.device;
		console.log("device")
		this.state={
			token:this.device.token,
			name: this.device.name,
			units: this.device.units,
			tipo: this.device.tipo,
			measuring: this.device.measuring,
			show6: this.device.show6,
			show4: this.device.show4,
			show5: this.device.show5,
			values: null,
			URL_SERV: this.props.URL_SERV,
		}

		this.options = [
		{label: 'Line', value: 'L'},
		{label: 'Round', value: 'R'}
		];

	}

	deviceDidMount(){
		this.setState({URL_SERV:this.props.URL_SERV})
		console.log(this.state.URL_SERV+"/"+this.state.token)
	}
	update_device=()=>{
		//console.log(this.state.URL_SERV+'/'+this.state.token)
		const {token,name,measuring,units,tipo,show4,show5,show6,URL_SERV}= this.state;
		fetch(URL_SERV+'/'+token,{
			method: 'put',
			headers: {'content-type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
		body: JSON.stringify({
			token:token,
			name: name,
			measuring: measuring,
			units: units,
			tipo: tipo,
			show5: show5,
			show4: show4,
			show6: show6
		})
	})
        //.then(setTimeout(this.props.getData(),500))
        .then(setTimeout(this.props.refresh(),500))
        .then(this.props.onHide())
        .then(this.props.refresh)
        .catch(err=>{
        	console.log(err)
        })
    }

    render(){
    	const {name,show4,show5,units}=this.state;
    	return(
    		<div>
    		<h3>Device name</h3>
    		<span className="ui-float-label">
    		<InputText id="float-input" type="text" size="30" required onChange={(e) => this.setState({name: e.target.value})}/>
    		<label htmlFor="float-input">{name}</label>
    		</span>
    		<h3>Units</h3>
    		<span className="ui-float-label">
    		<InputText id="float-input" type="text"  size="30" onChange={(e) => this.setState({units: e.target.value})}/>
    		<label htmlFor="float-input">{units}</label>
    		</span>
    		<h4>Min</h4>
    		<span className="ui-float-label">
    		<InputText id="float-input" type="text"  size="30" onChange={(e) => this.setState({show4: e.target.value})}/>
    		<label htmlFor="float-input">{show4}</label>
    		</span>
    		<h4>Max</h4>
    		<span>	
    		<InputText id="float-input" type="text"  size="30" onChange={(e) => this.setState({show5: e.target.value})}/>
    		<label htmlFor="float-input">{show5}</label>
    		</span>
    		<h3>Show</h3>				
    		<RadioButton inputId="rb1" value={"Lineal"} name='graph' onChange={(e) => this.setState({show6: e.value})} checked={this.state.show6 === "Lineal"}/>
    		<label htmlFor="rb1" className="p-radiobutton-label">Lineal</label>
    		<RadioButton inputId="rb2" value={"Radial"} name='graph' onChange={(e) => this.setState({show6: e.value})} checked={this.state.show6 === "Radial"}/>
    		<label htmlFor="rb2" className="p-radiobutton-label">Radial</label>
    		<hr/>
    		<Button label="Accept" icon="fa-check" onClick={()=>this.update_device()} />
    		<Button label="Cancel" icon="fa-times" onClick={()=>this.props.onHide()} />
    		</div>

    		)
    }




}