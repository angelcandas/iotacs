import React, { Component } from 'react';
import MainScreen from './MainScreen';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import image from './marcaUPVN1.png'
const URL_SERV = 'https://iotacsback.herokuapp.com';
const particlesOptions={
                particles: {
                  number:{
                    value: 50,
                    density:{
                      enable: true,
                      vlaue_area: 400

                    }
                  },
                
                "line_linked":{"enable":true,"distance":150,"color":"EFF1F3","opacity":0.4,"width":1}
              }};


const initialState= {
      input: '',
      imageURL_SERV: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name:'',
        email: '',
        entries: 0,
        joined: '',
      }
    }



class App extends Component{

constructor(props){
  super(props);
    this.state = {
      input: '',
      imageURL_SERV: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name:'',
        email: '',
        entries: 0,
        joined: '',
        key: '',
      }
    }
  }
  componentDidMount(){

  }

  loadUser = (data) =>{
    this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        key: data.key,
      }})
  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const {route}=this.state;
      
     return(
      <div className='App'>
      <img src={image} className='logo'/>
      <Particles className='particles' params={particlesOptions}/>
            
      
        {route === 'home' 
        ?<MainScreen URL_SERV={URL_SERV} onRouteChange={this.onRouteChange} user={this.state.user}/>
        : (route === 'signin' 
          ? <Signin URL_SERV={URL_SERV} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register URL_SERV={URL_SERV} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
    }
    </div>)}
}

export default App