import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import modal from 'hoc/modal'
import { get } from 'utils/request'
import { Button, Input, Form, DatePicker, Icon, Modal, Row, Col, Popconfirm, InputNumber } from 'antd'
import BasicTable from 'components/Table/Basic'
import styles from './style.less'
import SearchPro from 'components/SearchPro'
import Upload from 'components/Upload'


@modal
@observer
export default class ReferModal extends Component {
	constructor(props) {
		super(props)

		this.columns = [
			{
				width: 15, title: '', key: 'dilidili', render: (_, record) => {
					const { orderAmountMap } = record

					return <Icon className={`${orderAmountMap.some(i => i.selected) ? 'primary-6' : ''} fs16`} type="link" />
				}
			},
			{ width: 100, title: '货品名', key: 'name', },
			{
				width: 30, title: '', key: 'delete', render: (_, record) => {
					const style = {
						cursor: 'pointer',
						padding: 10,
					}

					return (
						<Popconfirm title='确定删除?' onConfirm={() => {
							this.props.deleteItem(record)
						}}>
							<span style={style}><Icon type="delete" /></span>
						</Popconfirm>
					)
				}
			}
		]

		this.columns2 = [
			{ width: 150, title: '采购单号', key: 'sequence', },
			{ width: 180, title: '收货仓店编号及名称', key: 'warehouse', },
			{ width: 180, title: '供应商编号及名称', key: 'supplier', },
			{ width: 80, title: '采购数量', key: 'amount', },
			{ width: 80, title: '已入库数', key: 'stockInAmount', },
			{ width: 80, title: '未入库数', key: 'unbound', },
			// { width: 80, title: '入库数量', key: 'bindedAmount', type: 'info' },
			{
				width: 80, title: <div className="primary-6">入库数量</div>, key: '_bindedAmount', render: (_, record) => {
					// return record.bindedAmount;
					return <InputNumber max={record.bound} min={0} value={record.bindedAmount} onChange={value => this.handleInput(value, record)} />
				}
			},
			{ width: 80, title: '可绑定入库数', key: 'bound', },
		]
	}

	handleInput = (value, record) => {
		value = value || 0
		record.bindedAmount = value
		// ============================================================
		this.props.data.forEach(item => {
			let amount = 0
			item.orderAmountMap.filter(i => i.selected).forEach(i => amount += i.bindedAmount)
			item.amount = amount
		})

		// ============================================================


		this.props.update()
	}

	handleSubmit = () => {
		const { data } = this.props

		let result = true

		data.forEach(item => {
			if (!item.orderAmountMap.some(i => i.selected)) result = false
			let amount = 0
			item.orderAmountMap.filter(i => i.selected).forEach(i => amount += i.bindedAmount)
			item.amount = amount
		})

		if (!result) return Modal.error({
			title: '存在入库货品未绑定采购单！',
			content: '无法完成参照制单...'
		})

		this.props.handleCancel()
	}

	onRowClick = (record) => {
		this.props.data.forEach(item => {
			if (item === record) item.highlight = true
			else item.highlight = false
		})
		this.props.update()
	}


	addPro = async (item) => {
		delete item.note
		if (this.props.data.map(i => i.key).includes(item.key)) return
		const { id: skuId } = item
		const { supplierId, warehouseId } = this.props
		const { data } = await get('/api/purchaseOrders/forStockIn', { skuId, supplierId, warehouseId, showInvalid: false })

		if (data.length == 0) return

		data.forEach(item => {
			item.key = item.id
			item.unbound = item.amount - item.stockInAmount
			item.bound = item.amount - item.boundStockInAmount
			item.bindedAmount = item.bound

		})

		item.orderAmountMap = data

		this.props.addItems([item])
	}


	render() {
		const { HocModal, supplierId, data } = this.props

		let record = {}

		data.forEach(item => {
			if (item.highlight) record = item
		})

		const { orderAmountMap = [] } = record

		const selectedRowKeys = orderAmountMap.filter(i => i.selected).map(i => i.key)

		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				orderAmountMap.forEach(i => {
					if (selectedRowKeys.includes(i.key)) i.selected = true
					else i.selected = false
				})

				this.props.data.forEach(item => {
					let amount = 0
					item.orderAmountMap.filter(i => i.selected).forEach(i => amount += i.bindedAmount)
					item.amount = amount
				})
				this.props.update(this.props.data)
			},
			selectedRowKeys,
		}

		return (
			<HocModal
				title={<div className="flex-vcenter jc-between">
					<div>参照制单</div>
					<div className="flex" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
						<div><Icon className="fs16 primary-6 mr10" type="link" /><span className="fs12">货品<span className="primary-6">已绑定</span>采购单</span></div>
						<div><Icon className="fs16 ml50 mr10" type="link" /><span className="fs12">货品未绑定采购单</span></div>
					</div>
				</div>}
				maskClosable={false}
				width={1300}
				closable={false}
				footer={null}
			>
				<Row>
					<Col className={`${styles.left} flex-col`} span={5}>
						<div style={{ padding: 10 }}>
							<div>
								<strong className="mr20">添加入库货品</strong>
								<Upload columns={this.columns}><Button type="primary" ghost icon="file-excel" className="ml20">Excel导入商品</Button></Upload>
							</div>
							<div className="mt10"><SearchPro onChange={item => this.addPro(item)} /></div>
						</div>
						<div>
							<BasicTable
								onRow={(record, index) => ({
									onClick: this.onRowClick.bind(this, record)
								})}
								scroll={{ y: 360 }}
								dataSource={data}
								rowClassName={(r) => {
									return r === record ? 'active' : ''
								}}
								columns={this.columns}
								pagination={false} />
						</div>
						<div className="flex-g-1"></div>
						<div style={{ textAlign: 'center', marginBottom: 10 }}>
							<Button onClick={this.handleSubmit} style={{ width: 150 }} type="primary" size="large">完成</Button>
						</div>
					</Col>
					<Col className={styles.right} span={19}>
						<BasicTable
							columns={this.columns2}
							min
							dataSource={orderAmountMap}
							scroll={{ y: 450 }}
							rowSelection={rowSelection}
							title={() => {
								return <div>{record.name ? <div>商品<span className="primary-6">{record.name}</span>对应可参照采购单</div> : <strong>请在左侧添加参照商品</strong>}</div>
							}}
							pagination={false} />
					</Col>
				</Row>
			</HocModal>
		)
	}
}