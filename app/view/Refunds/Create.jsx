import React, { Component } from 'react'
import { Button, Input, Form, DatePicker, Icon, Modal, Select } from 'antd'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import { Container, Content, HandleArea } from 'components/Layout'
import SearchPro from 'components/SearchPro'
import create from 'hoc/create-table'


@inject(stores => ({
	body: stores.body,
	backStore: stores.refunds,
	returnTypesOption: stores.database.returnTypesOption,
	}))
@create({
	setFields: ['fromWarehouse', 'toWarehouse', 'typeId'],
	})
export default class extends Component {
	columns = [
		{ width: 200, title: '货品', key: 'number' },
		{ width: 150, title: '货品名称', key: 'name' },
		{ width: 80, title: '采购价', key: 'costPrice' },
		{ width: 80, title: '零售价', key: 'price' },
		{ width: 100, title: '退货数量', key: 'amount', edit: { type: 'number' } },
		{ width: 100, title: '可用库存数量', key: 'availableInventory', type: 'info' },
		// { width: 200, title: '备注', key: 'note', },
	]

	computedQuery = (value) => {
		value.items.forEach(item => {
			item.skuId = item.skuId || item.id
			delete item.id
		})
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
		} = this.props

		const { fromWarehouseId } = this.props.form.getFieldsValue()

		return (
			<Container>
				<BackCreateHearder handleSubmit={() => this.props.handleSubmit(this.computedQuery)} />
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{sequenceField}
								<BindedFormItem label="退货类型" keyValue="typeId" rules={true}>
									<Select style={{ width: 150 }}>{this.props.returnTypesOption}</Select>
								</BindedFormItem>
								{toWarehouseField}
								{fromWarehouseField}
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
								<SearchPro disabled={!fromWarehouseId} warehouseId={fromWarehouseId} onChange={item => addItems([item])} />
								{/* <Button type="primary" ghost className="ml20">选择添加商品</Button> */}
								<RenderUpload columns={this.columns}>
									<Button disabled={!fromWarehouseId} type="primary" ghost icon="file-excel" className="ml20">Excel导入商品</Button>
								</RenderUpload>
							</div>)}
					/>
				</Content>
			</Container>
		)
	}
}
