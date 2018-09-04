import React, { Component } from 'react';
import './Pizarra.css'

let linea=[];

class Pizarra extends Component {
  state = {
    color: 'green',
    value: 'Boton verde',
    style: "f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
  };
 
  handleDrag = () =>{
  	console.log("Esto es un drag")
  }
  handleClick = () => {
  	this.state.color==='green'?
    (this.setState({
      color: 'red',
      value: 'Boton azul',
      style: "f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-blue"
    }))
    :
    (this.setState({
      color: 'green',
      value: 'Boton verde',
      style: 'f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green'
    })
    )
    console.log(this.state.color)
  };

  handleUpdate = () =>{
    this.linea=[
    <div>
      <a onDrag={this.handleDrag}
      onClick={()=>this.handleClick()} 
      className={this.state.style}>{this.state.value}
      </a>
      </div>
      ];
      console.log("updating")
  }



  render() {
    this.handleUpdate();
    return (
 		this.linea
    )
  }
}


export default Pizarra;