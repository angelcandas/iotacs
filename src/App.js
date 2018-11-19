import React, { Component } from 'react';
import MainScreen from './MainScreen';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import PropTypes from 'prop-types';
import {Global} from './services/Global';
import './App.css';


//const REACT_VERSION = React.version;
console.log(Global.URL_SERV) //'https://iotacsback.herokuapp.com';
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
    static propTypes={ 
      children: PropTypes.object.isRequired
    }
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
        name:'',//cookie.load('name')||'',
        email: '',//cookie.load('email')||'',
        entries: 0,
        joined: '',
        key:''// cookie.load('key')||'',
      }
    }

  //console.log("Hola mundo")
}
componentDidMount(){
  let temproute = localStorage.getItem('route')
  let tempuser = localStorage.getItem('user')
  let tempisSigned = localStorage.getItem('isSignedIn')
  if(temproute && tempuser){
    this.setState({route: temproute});
    this.setState({user:JSON.parse(tempuser)});
    console.log(JSON.parse(tempuser))
  }
  if(tempisSigned){
    this.setState({isSignedIn: tempisSigned})
  }
    //console.log(REACT_VERSION)
  }

  componentWillMount(){

  }

  loadUser = (data) =>{
    console.log(data)
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
      localStorage.clear();
      return(this.onRouteChange('login'))
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
      localStorage.setItem('isSignedIn', true)
    }
    this.setState({route: route});
    localStorage.setItem('route', route)
  }

/*render(){

  return "../views/test.html"


}*/

render(){
  const {children}=this.props;
  const {route,isSignedIn}=this.state;
    //console.log(this.state)
    /*if(isSignedIn)
      console.log(route==="home")
      console.log(isSignedIn)*/
      return(
        <div className='App'>
        <Particles className='particles' params={particlesOptions}/>     
          {children}
        </div>)}

    }

    export default App