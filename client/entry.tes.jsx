import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import QueueAnim from 'rc-queue-anim'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'

// import Demo from 'app/test/Layout';
// import Demo from 'app/test/G2'


class Container extends Component {
	state = {}
	render() {
		const { props } = this
		return (
			<div id="da">
				<OverPack location="da">
					<QueueAnim style={{ height: 100 }} key="123">
						<div key="demo1">依次进场</div>
						<div key="demo2">依次进场</div>
						<div key="demo3">依次进场</div>
						<div key="demo4">依次进场</div>
					</QueueAnim>
				</OverPack>
			</div>
		)
	}
}


class Wrap extends Component {
	state = {}
	render() {
		return (
			<div>
				<div style={{ height: 2000 }}></div>
				<Container id="Container" />
			</div>
		)
	}
}


ReactDOM.render(
	<Wrap />,
	document.getElementById('root')
)
