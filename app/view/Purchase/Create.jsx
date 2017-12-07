import React, { Component } from 'react';
import { Button } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import { observer, inject } from 'mobx-react';

@inject('create')
@observer
export default class extends Component {
	render() {
		return (
			<Container>
				<Header asyncBack={{ asyncAction: this.props.create.submit }} type="create">{this.props.name}</Header>
				<Content>
					<HandleArea>ss</HandleArea>
				</Content>
			</Container>
		);
	}
}
