import React, { Component } from 'react';

export default class extends Component {
	state = {}
	render() {
		return (
			<div style={{ backgroundColor: '#fff', ...this.props.style, margin: 8, borderRadius: 4 }} className={`${this.props.className} flex-g-1`}>
				{this.props.children}
			</div>
		);
	}
}
