import React, { Component } from 'react';

export default class extends Component {
	render() {
		return (
			<div style={{ margin: 10 }}>
				{this.props.children}
			</div>
		);
	}
}
