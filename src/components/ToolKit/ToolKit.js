import React, { Component } from 'react';
import Konva from 'konva';
import logo from'./logo.png';

const width=800;
const height = 500;
const colores={
	0: 'white',
	1: 'bg-blue',
	2: 'bg-light-blue',
	3: 'bg-dark-blue',
	4: 'bg-red',
	5: 'bg-light-red',
	6: 'bg-light-green',
	7: 'bg-green',

}
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});


const estrella = new Konva.Star()
console.log(estrella)
class ToolKit extends Component {    
	constructor(){
		super();
		this.state={
		background: 'white'
		

		}
		this.buttons=[]
		return(
			<div id='container'></div>)

	}

	
   

	handleClick= (origin,value) =>{
		console.log(origin)
	}


   render(){
   		for (var i = colores.length - 1; i >= 0; i--) {
			console.log(colores[i])
			this.buttons.push(<img id='rob_1'  onClick={()=>this.handleClick(this.colores[i])} alt='logo' className={'grow 100px '+this.colores[i]} src={logo}  height='100px'/>)
		}
	return(
	<div id='container' className='flex-container Canvas b f3 fl 300px ba' 
	style={{display: 'inline-flex', justifyContent: 'flex-init',flex_wrap: 'wrap', align:'center'}} > 
    	{this.buttons}
    </div>
   )
	}
  }

  export default ToolKit;