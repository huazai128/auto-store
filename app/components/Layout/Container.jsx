import React, { Component } from 'react';

export default class extends Component {
	state = {}
	render() {
		return (
			<div style={{ backgroundColor: '#E6EAF3', height: '100%' }} className="flex-col">
				{this.props.children}
			</div>
		);
	}
}
