import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import WebFont from 'webfontloader';
import AppRoutes from './routes';
WebFont.load({
  google: {
    families: ['Cinzel:300,400,700', 'serif']
  }
});


render(
	<BrowserRouter>
		<AppRoutes/>
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
