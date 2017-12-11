import React, { Component } from 'react';

export default class extends Component {
	render() {
		return (
			<div style={{ overflow: 'auto', backgroundColor: '#fff', ...this.props.style, margin: 8, borderRadius: 4 }} className={`${this.props.className} flex-col flex-g-1`}>
				{this.props.children}
			</div>
		);
	}
}
