import React, { Component } from 'react';
import { Button } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import { observer, inject } from 'mobx-react';

@inject('Create')
@observer
export default class extends Component {
	store = new this.props.Create();

	render() {
		return (
			<Container>
				<Header asyncBack={{ asyncAction: this.store.submit }} type="create">{this.props.name}</Header>
				<Content>
					<HandleArea><Button onClick={this.store.countUp}>按钮{this.store.count}</Button></HandleArea>
				</Content>
			</Container>
		);
	}
}
