import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon, Modal, Select } from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import { Container, Content, HandleArea } from 'components/Layout';
import SearchPro from 'components/SearchPro';
import create from 'hoc/create-table';


@inject(stores => ({
	body: stores.body,
	backStore: stores.return_,
	returnTypesOption: stores.database.returnTypesOption,
}))
@create()
export default class extends Component {
	columns = [
		{ width: 200, title: '货品', key: 'number' },
		{ width: 150, title: '货品名称', key: 'name' },
		{ width: 80, title: '采购价', key: 'costPrice' },
		{ width: 80, title: '结算价', key: 'price' },
		{ width: 100, title: '退厂数量', key: 'amount', edit: { type: 'number' } },
		{ width: 200, title: '备注', key: 'note', },
	]

	computedQuery = (value) => {
		value.items = value.items.map(item => ({
			skuId: item.id,
			amount: item.amount,
		}));
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
			supplierField,
			sequenceField
		} = this.props;

		return (
			<Container>
				<BackCreateHearder handleSubmit={() => this.props.handleSubmit(this.computedQuery)} />
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{sequenceField}
								<BindedFormItem label="退厂类型" keyValue="typeId" rules={true}>
									<Select style={{ width: 150 }}>
										{this.props.returnTypesOption}
									</Select>
								</BindedFormItem>
								{fromWarehouseField}
								{supplierField}
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
								<RenderUpload columns={this.columns}><Button type="primary" ghost icon="file-excel" className="ml20">Excel导入商品</Button></RenderUpload>
							</div>)}
					/>
				</Content>
			</Container>
		);
	}
}
