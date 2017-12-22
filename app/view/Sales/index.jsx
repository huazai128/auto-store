import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import Header from 'components/Header';
import { RangePicker } from 'components/DatePicker';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { observer, inject } from 'mobx-react';
const ButtonGroup = Button.Group;


@inject('sales')
@observer
export default class extends Component {
	store = this.props.sales

	componentDidMount() {
		this.store.init();
	}

	render() {
		return (
			<Container>
				<Header store={this.store} noSearch>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<div className="flex-vcenter ml10">
							查询日期：
							<RangePicker onChange={this.store.handleRangePicker} />
						</div>
					</HandleArea>
					<this.store.RenderMainTable className="two-row" title={this.props.name} />
				</Content>
			</Container>
		);
	}
}
