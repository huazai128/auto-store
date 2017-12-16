import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import CreateHearder from 'components/Header/CreateHearder';
import { Container, Content, HandleArea } from 'components/Layout';
import SearchPro from 'components/SearchPro';
import create from 'hoc/create-table';

@inject(store => ({
	body: store.body,
	distributions: store.distributions,
}))
@create({
	url: 'api/distributions',
})
export default class extends Component {
	columns = [
		{ width: 200, title: '款号', key: 'number' },
		{ width: 150, title: '款号名称', key: 'name' },
		{ width: 80, title: '单款现价', key: 'price' },
		{ width: 80, title: '折扣', key: 'discount' },
		{ width: 100, title: '补货数量', key: 'amount', edit: { type: 'number' } },
		{ width: 200, title: '备注', key: 'note', },
	]

	cb = () => {
		this.props.body.remove(this.props.pathname, this.props.push);
		this.props.distributions.getData();
	}

	computedQuery = (value) => {
		value.items.forEach(item => delete item.id);
	}

	render() {
		const { RenderCreateTable, BindedFormItem, RenderUpload, handleSubmit } = this.props;

		return (
			<Container>
				<CreateHearder cb={this.cb} handleSubmit={() => this.props.handleSubmit(this.computedQuery)}>{this.props.name}</CreateHearder>
				<Content style={{ padding: 10 }}>
					<Form>
						<BindedFormItem keyValue="toWarehoseId" />
						<BindedFormItem keyValue="toWarehoseName" />
						<BindedFormItem keyValue="fromWarehoseId" />
						<BindedFormItem keyValue="fromWarehoseName" />
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{/* <BindedFormItem label="采购单单号" keyValue="sequence">
									<Input style={{ width: 200 }} disabled />
								</BindedFormItem> */}
								<BindedFormItem label="收货地编号及名称" rules={true} keyValue="toWarehouseId">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="供货地编号及名称" rules={true} keyValue="fromWarehouseId">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="发货日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="shipDate"
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
						columns={this.columns}
						title={() => (
							<div>
								<strong>单据明细编辑</strong>
								<SearchPro />
								<Button type="primary" ghost className="ml20">选择添加商品</Button>
								<RenderUpload columns={this.columns}><Button type="primary" ghost className="ml20">Excel导入商品</Button></RenderUpload>
							</div>)}
					/>
				</Content>
			</Container>
		);
	}
}
