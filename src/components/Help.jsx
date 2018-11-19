
import React from 'react';
import TopBar from './topBar'
import {Button} from 'primereact/components/button/Button';
import {Card} from 'primereact/components/card/Card';
import {TieredMenu} from 'primereact/components/tieredmenu/TieredMenu';
import items from './helpmenu.jsx'
export default class Help extends React.Component{
	constructor(){
		super()
		
	}

	scrollto=(element)=>{
		var elmnt = document.getElementById(element);
		console.log(element)
		/*elmnt.scrollIntoView()*/
	}

	render(){
		const items={
		  title: "Index",
		  elements:{
		    0: ["Crear un token", "uno"],
		    1: ["Crear un dispositivo", "dos"],
		    2: ["Eliminar un dispositivo", "tres"]
		  }
		}
		console.log("la buena ayuda")
		return(
			<div>
			<TopBar history={this.props.history} />
			<div className="helpmenu"> 
				<h1>{items.title}</h1>
				<span onClick={this.scrollto("tokens")}>Tokens</span>
				<span onClick={this.scrollto("devices")}>Dispositivos</span>
				<span onClick={this.scrollto("downloads")}>Descargas</span>
			</div>
			<div id="tokens" className="helpPanel">
				<h1 >Tokens</h1>
				<p>La peor pagina de ayuda de la historia que nisiquiera es capace di caricare</p>
			</div>
			<div id="devices" className="helpPanel">
				<h1 >Dispositivos</h1>
				<p>La peor pagina de ayuda de la historia que nisiquiera es capace di caricare</p>
			</div>
			<div id="downloads" className="helpPanel">
				<h1 >Descargas</h1>
				<p>La peor pagina de ayuda de la historia que nisiquiera es capace di caricare</p>
			</div>
			<div className="helpPanel">
				<h1>La ayudita buena</h1>
				<p>La peor pagina de ayuda de la historia que nisiquiera es capace di caricare</p>
			</div>

			</div>
			)

	}}