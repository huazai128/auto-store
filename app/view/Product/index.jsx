import React, { Component } from 'react';
import { Button } from 'antd';
import Header from 'components/Header';
import Content from 'components/Content';
import Container from 'components/Container';

export default class extends Component {
	render() {
		return (
			<Container>
				<Header>{this.props.headerTitle}</Header>
				<Content>
					sd
				</Content>
			</Container>
		);
	}
}
