import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, withRouter, Route } from 'react-router-dom'
// import { BrowserRouter as Router, withRouter, Route } from 'react-router-dom'

import { Provider } from 'mobx-react'

import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Routes from 'app/routes'
import stores from 'app/stores'

import 'hoc/bill'

// import 'ant-design-pro/dist/ant-design-pro.css';

import 'assets/styles/custom.less'
import 'assets/styles/flex.less'
import 'assets/styles/layout.less'
import 'assets/styles/antd.less'

const Wrap = withRouter(props => <Routes {...props} />)

ReactDOM.render(
	<LocaleProvider locale={zhCN}>
		<Provider {...stores}>
			<Router>
				<Wrap />
			</Router>
		</Provider>
	</LocaleProvider>,
	document.getElementById('root')
)
