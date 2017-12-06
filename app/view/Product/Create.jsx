import React, { Component } from 'react';
import { Button } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import { observer, inject } from 'mobx-react';

export default class extends Component {
	state = {}
	render() {
		return (
			<Container>
				<Header type="create">{this.props.headerTitle}</Header>
				<Content>
					<HandleArea>ss</HandleArea>
				</Content>
			</Container>
		);
	}
}
