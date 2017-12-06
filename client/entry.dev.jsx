import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, withRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import viewMap from 'utils/viewMap';

import Routes from 'app/routes';

import stores from 'app/stores';

import 'assets/styles/custom.global.scss';
import 'assets/styles/flex.global.scss';
import 'assets/styles/layout.global.scss';
import 'assets/styles/antd.global.scss';



const Wrap = withRouter(props => <Routes {...props} />);

ReactDOM.render(
	<Provider {...stores}>
		<Router>
			<Wrap />
		</Router>
	</Provider>,
	document.getElementById('root')
);
