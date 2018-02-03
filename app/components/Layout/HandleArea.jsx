import React, { Component } from 'react'
import { Divider } from 'antd'

export default class extends Component {
	render() {
		return (
			<div className={this.props.className} style={{ margin: 10, marginBottom: 0, ...this.props.style }}>
				{this.props.children}
			</div>
		)
	}
}
