import React, { Component } from 'react'
import { Button, Input, Form, DatePicker, Icon, Modal } from 'antd'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import { Container, Content, HandleArea } from 'components/Layout'
import SearchPro from 'components/SearchPro'
import create from 'hoc/create-table'
import { get, post, postByParam } from 'utils/request'


@inject(store => ({ body: store.body, backStore: store.purchase, }))
@create({ setFields: ['supplier', 'toWarehouse', 'purchaseDate'], })
export default class extends Component {
	columns = [
		{ width: 200, title: '货品', key: 'number' },
		{ width: 150, title: '货品名称', key: 'name' },
		{ width: 80, title: '采购价', key: 'costPrice' },
		{ width: 80, title: '零售价', key: 'price' },
		{ width: 100, title: '数量', key: 'amount', edit: { type: 'number' } },
		{ width: 200, title: '备注', key: 'note', },
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

		return (
			<Container>
				<BackCreateHearder handleSubmit={() => this.props.handleSubmit(this.computedQuery)} />
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{sequenceField}
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
								<SearchPro onChange={item => {
									addItems([item])
								}} />
								<RenderUpload>
									<Button type="primary" icon="file-excel" ghost className="ml20">Excel导入商品</Button>
								</RenderUpload>
							</div>)}
					/>
				</Content>
			</Container>
		)
	}
}
