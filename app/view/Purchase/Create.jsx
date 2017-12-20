import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
// import CreateHearder from 'components/Header/CreateHearder';
import { Container, Content, HandleArea } from 'components/Layout';
import SearchPro from 'components/SearchPro';
import create from 'hoc/create-table';


@inject(store => ({
	body: store.body,
	backStore: store.prurchase,
}))
@create()
export default class extends Component {
	columns = [
		{ width: 200, title: '款号', key: 'number' },
		{ width: 150, title: '款号名称', key: 'name' },
		{ width: 80, title: '单款现价', key: 'price' },
		{ width: 80, title: '折扣', key: 'discount' },
		{ width: 100, title: '补货数量', key: 'amount', edit: { type: 'number' } },
		{ width: 200, title: '备注', key: 'note', },
	]

	computedQuery = (value) => {
		value.items.forEach(item => {
			item.skuId = item.id;
			delete item.id;
		});
	}

	render() {
		const {
			BackCreateHearder,
			RenderCreateTable,
			BindedFormItem,
			RenderUpload,
			handleSubmit,
			addItems,

			toWarehouseField,
			fromWarehouseField,
			warehouseField,
			supplierField
		} = this.props;

		return (
			<Container>
				{/* <CreateHearder handleSubmit={() => this.props.handleSubmit(this.computedQuery)}>{this.props.name}</CreateHearder> */}
				<BackCreateHearder handleSubmit={() => this.props.handleSubmit(this.computedQuery)} />
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{this.props.params.id && <BindedFormItem label="采购单单号" keyValue="sequence">
									<Input style={{ width: 200 }} disabled />
								</BindedFormItem>}
								{toWarehouseField}
								{supplierField}
								<BindedFormItem label="采购日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="purchaseDate"
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
								<SearchPro onChange={item => addItems([item])} />
								<Button type="primary" ghost className="ml20">选择添加商品</Button>
								<RenderUpload columns={this.columns}><Button type="primary" ghost className="ml20">Excel导入商品</Button></RenderUpload>
							</div>)}
					/>
				</Content>
			</Container>
		);
	}
}
