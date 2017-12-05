import React, { Component } from 'react';

export default class extends Component {
	state = {}
	render() {
		return (
			<div style={{ backgroundColor: '#E6EAF3', ...this.props.style }} className={`${this.props.className} flex-g-1`}>
				{this.props.children}
			</div>
		);
	}
}
