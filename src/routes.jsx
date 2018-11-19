import React from 'react'
import {Route,Switch} from 'react-router-dom'
import App from './App'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import MainScreen from './MainScreen'
import Help from './components/Help';
import TokenView from './components/tokens';
/*
import About from './components/About';
import Page404 from './components/Page404';
*/

const AppRoutes = () =>
		<App>
			<Switch>
				<Route exact path="/help" component={Help}/>
				<Route exact path="/login" component={Signin}/>
				<Route exact path="/register" component={Register}/>
				<Route exact path="/dash" component={MainScreen}/>
				<Route exact path="/tokens" component={TokenView}/>
				<Route component={MainScreen}/>
			</Switch>
		</App>
	

export default AppRoutes;