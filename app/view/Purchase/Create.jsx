import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import SearchSku from 'components/SearchSku';
import create from 'hoc/create-table';

@inject(store => ({
	body: store.body,
	prurchase: store.prurchase,
}))
@create({
	url: 'api/prurchase',
	columns: [
		{ width: 200, title: '款号', key: 'number' },
		{ width: 150, title: '款号名称', key: 'name' },
		{ width: 80, title: '单款现价', key: 'price' },
		{ width: 80, title: '折扣', key: 'discount' },
		{ width: 100, title: '补货数量', key: 'amount', edit: { type: 'number' } },
		{ width: 200, title: '备注', key: 'note', },
	]
})
export default class extends Component {
	cb = () => {
		this.props.body.remove(this.props.pathname, this.props.push);
		this.props.prurchase.getData();
	}

	ok = async () => {
		const values = this.props.handleSubmit();
		if (!values) return;
		return await this.props.create(values);
	}

	render() {
		const { RenderCreateTable, BindedFormItem, RenderUpload, handleSubmit } = this.props;
		return (
			<Container>
				<Header handleSubmit={this.ok} type="create">{this.props.name}</Header>
				<Content style={{ padding: 10 }}>
					<Form>
						<BindedFormItem keyValue="toWarehoseId" />
						<BindedFormItem keyValue="toWarehoseName" />
						<BindedFormItem keyValue="fromWarehoseId" />
						<BindedFormItem keyValue="fromWarehoseName" />
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								<BindedFormItem label="采购单单号" rules={true} keyValue="a">
									<Input style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="收货店铺编号及名称" rules={true} keyValue="d">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="供货仓库编号及名称" rules={true} keyValue="c">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="采购日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="b"
								>
									<DatePicker allowClear={false} />
								</BindedFormItem>
							</div>
							<div className="flex-vcenter">
								<BindedFormItem label="备注" keyValue="note">
									<Input style={{ width: 350 }} />
								</BindedFormItem>
							</div>
						</HandleArea>
					</Form>
					<RenderCreateTable
						title={() => (
							<div>
								<strong>单据明细编辑</strong>
								<SearchSku />
								<Button type="primary" ghost className="ml20">选择添加商品</Button>
								<RenderUpload><Button type="primary" ghost className="ml20">Excel导入商品</Button></RenderUpload>
							</div>)}
					/>
				</Content>
			</Container>
		);
	}
}
