import React, { Component } from 'react'
import { Button, Input, Form, DatePicker, Icon, Modal, Row, Col, Popconfirm, InputNumber } from 'antd'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import { Container, Content, HandleArea } from 'components/Layout'
import create from 'hoc/create-table'

import ReferModal from './ReferModal'



@inject(store => ({
	body: store.body,
	backStore: store.storage,
	}))
@create({
	setFields: ['supplier', 'warehouse'],
	})
@observer
export default class extends Component {
	columns = [
		{ width: 200, title: '货品', key: 'number' },
		{ width: 150, title: '货品名称', key: 'name' },
		{ width: 80, title: '采购价', key: 'costPrice' },
		{ width: 80, title: '结算价', key: 'price' },
		{ width: 100, title: '本次入库数量', key: 'amount', type: 'info' },
		{ width: 80, title: '采购价总额', key: 'costPriceall', render: (_, record) => <p>{(record.amount * record.costPrice).toFixed(2)}</p> },
		{ width: 80, title: '结算价总额', key: 'priceall', render: (_, record) => <p>{(record.amount * record.price).toFixed(2)}</p> },
		{ width: 200, title: '备注', key: 'note', edit: {} },
	]

	computedQuery = (value) => {
		value.items = value.items.map(item => ({
			skuId: item.id,
			note: item.note,
			orderAmountMap: item.orderAmountMap.filter(i => i.selected).map(i => ({
				orderId: i.id,
				amount: i.bindedAmount,
			}))
		}))
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
		} = this.props

		const { supplierId, warehouseId, toWarehouseId, fromWarehouseId } = this.props.form.getFieldsValue()

		return (
			<Container>
				<BackCreateHearder handleSubmit={() => this.props.handleSubmit(this.computedQuery)} />
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{this.props.params.id && <BindedFormItem label="单号" keyValue="sequence">
									<Input style={{ width: 200 }} disabled />
								</BindedFormItem>}
								<BindedFormItem label="到货日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="arrivalDate"
								>
									<DatePicker allowClear={false} />
								</BindedFormItem>
								{warehouseField}
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
						noDelete={false}
						columns={this.columns}
						title={() => (
							<div>
								<strong>单据明细编辑</strong>
								<ReferModal
									data={this.props.items}
									deleteItem={this.props.deleteItem}
									addItems={this.props.addItems}
									update={this.props.update}
									warehouseId={warehouseId}
									supplierId={supplierId}>
									<Button disabled={!supplierId || !warehouseId} type="primary" className="ml20">参照制单</Button>
								</ReferModal>
							</div>
						)}
					/>
				</Content>
			</Container>
		)
	}
}
