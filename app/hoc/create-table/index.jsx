import React, { Component } from 'react'
import Table from 'components/Table/CreateTable'
import { Form, Modal, Input, Icon, Badge, Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import { filterRepeat } from 'utils'
import { get, post, postByParam } from 'utils/request'
import Upload from 'components/Upload'
import CreateFormItem from 'components/Form/CreateFormItem'
import ColligatePopover from 'components/Select/ColligatePopover'
import moment from 'moment'
import CreateHearder from 'components/Header/CreateHearder'

import styles from './style.less'

const simpleColumns = [
	{ width: 200, title: '货品', key: 'number' },
	{ width: 150, title: '货品名称', key: 'name' },
	{ width: 80, title: '采购价', key: 'costPrice' },
	{ width: 80, title: '零售价', key: 'price' },
	{ width: 100, title: '数量', key: 'amount', edit: { type: 'number' } },
	{ width: 200, title: '备注', key: 'note', },
]

@Form.create()
export default (options = {}) => WrappedComponent => {
	const { url, setFields = [] } = options

	return class extends React.Component {

		constructor(props) {
			super(props)

			this.id = this.props.params.id

			const { getFieldDecorator } = props.form
			this.BindedFormItem = ({ children, ...rest }) => React.cloneElement(<CreateFormItem>{children}</CreateFormItem>, { getFieldDecorator, ...rest })
			this.RenderUpload = ({ children, ...rest }) => React.cloneElement(<Upload>{children}</Upload>, {
				handleConfirm: this.addItems,
				columns: simpleColumns,
				baseUrl: '/api/skus/import/simple',
				...rest
			})

			this.RenderCreateTable = (props) => React.cloneElement(<Table />, {
				deleteItem: this.deleteItem,
				handleIpuntChange: this.handleIpuntChange,
				// orderAmountMap入库制单
				items: this.state.items.filter(item => item.orderAmountMap ? item.orderAmountMap.some(i => i.selected) : item),
				...props
			})

			this.state = {
				items: [],
				ready: true,
			}

			this.sequenceField = this.props.params.id ? <this.BindedFormItem label="单号" keyValue="sequence">
				<Input style={{ width: 200 }} disabled />
			</this.BindedFormItem> : null

			const pointerNode = (props = {}) => {
				return <Input className={styles.pointer} suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} {...props} />
			}
			// ============================================================
			this.WarehouseFormItem = ({ label = '仓库编号及名称', BottomNode = null, value, props }) => (
				// <ColligatePopover title="请选择仓库" selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'warehouse')}>
				<div>
					<this.BindedFormItem keyValue="warehouseId" />
					<this.BindedFormItem keyValue="warehouseName" />
					<ColligatePopover title="请选择仓库" selectedRowKeys={[value]} dataType="warehouseData" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'warehouse')}>
						<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="warehouseNumber">
							{pointerNode(props)}
						</this.BindedFormItem>
					</ColligatePopover>
				</div>
			)

			// ============================================================
			this.ToWarehouseFormItem = ({ label = '收货仓编号及名称', BottomNode = null, value, disabledId }) => (
				<div>
					<this.BindedFormItem keyValue="toWarehouseId" />
					<this.BindedFormItem keyValue="toWarehouseName" />
					<ColligatePopover title="请选择收货仓" disabledId={disabledId} selectedRowKeys={[value]} dataType="warehouseData" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'toWarehouse')}>
						<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="toWarehouseNumber">
							{pointerNode()}
						</this.BindedFormItem>
					</ColligatePopover>
				</div>
			)

			// ============================================================
			this.FromWarehouseFormItem = ({ label = '供货仓编号及名称', BottomNode = null, value, disabledId }) => (
				<div>
					<this.BindedFormItem keyValue="fromWarehouseId" />
					<this.BindedFormItem keyValue="fromWarehouseName" />
					<ColligatePopover title="请选择供货仓" disabledId={disabledId} selectedRowKeys={[value]} dataType="warehouseData" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'fromWarehouse')}>
						<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="fromWarehouseNumber">
							{pointerNode()}
						</this.BindedFormItem>
					</ColligatePopover>
				</div>
			)

			// ============================================================
			this.SupplierFormItem = ({ label = '供应商编号及名称', BottomNode = null, value }) => (
				<div>
					<this.BindedFormItem keyValue="supplierId" />
					<this.BindedFormItem keyValue="supplierName" />
					<ColligatePopover title="请选择供应商" selectedRowKeys={[value]} radio dataType="supplierData" onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'supplier')}>
						<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="supplierNumber">
							{pointerNode()}
						</this.BindedFormItem>
					</ColligatePopover>
				</div>
			)
			// ============================================================

			this.BottomNode = ({ name }) => name ? <div className="ml10"><Badge status="processing" /><span style={{ marginRight: 15 }}>{name}</span></div> : null

			this.BackCreateHearder = (props) => React.cloneElement(<CreateHearder>{this.props.name}</CreateHearder>, {
				cb: this.cb,
				...props
			})
		}


		async componentWillMount() {
			if (this.id) {
				this.setState({ ready: false, })
				const { data } = await get(`${this.props.backStore.url}/detail`, { id: this.id })

				if (Array.isArray(data.items)) {
					data.items.forEach(item => {
						item.name = item.name || item.skuName
						item.number = item.number || item.skuNumber
						item.skuId = item.skuId || item.id
					})
				}

				this.setState({
					ready: true,
					items: data.items
				}, () => {
					if (!Array.isArray(setFields)) return
					const otherValues = {}

					Object.keys(data).forEach((item) => {
						if (typeof data[item] == 'number' && String(data[item]).length == 13) data[item] = moment(data[item])
					})

					setFields.forEach(field => {
						if (field == 'supplier') {
							otherValues.supplierId = data.supplierId
							otherValues.supplierName = data.supplierName
							otherValues.supplierNumber = data.supplierNumber
						}
						else if (field == 'toWarehouse') {
							otherValues.toWarehouseId = data.toWarehouseId
							otherValues.toWarehouseName = data.toWarehouseName
							otherValues.toWarehouseNumber = data.toWarehouseNumber
						}
						else if (field == 'fromWarehouse') {
							otherValues.fromWarehouseId = data.fromWarehouseId
							otherValues.fromWarehouseName = data.fromWarehouseName
							otherValues.fromWarehouseNumber = data.fromWarehouseNumber
						}
						else if (field == 'warehouse') {
							otherValues.warehouseId = data.warehouseId
							otherValues.warehouseName = data.warehouseName
							otherValues.warehouseNumber = data.warehouseNumber
						}
						else otherValues[field] = data[field]
					})

					this.props.form.setFieldsValue({
						sequence: data.sequence,
						note: data.note,
						...otherValues
					})

				})
			}
		}

			cb = () => {
				this.props.push(this.props.callbackPathname)
				this.props.body.remove(this.props.pathname, this.props.push, true)
				this.props.backStore.getData()
			}


			addItems = async (newItems = [], type) => {
				let data = filterRepeat([...this.state.items, ...newItems], 'id')


				if (this.props.byWarehouse && type === 'imp') {
					const response = await get('/api/skus/listWithInventoryByIds', { ids: data.map(i => i.id).toString(), warehouseId: this.props.form.getFieldsValue().fromWarehouseId })
					data = response.data
				}

				this.setState({
					items: data,
				})
			}

			onConfirmPopover = (record, type) => {
				if (!record || !type) return

				const { name, number, id } = record
				/* eslint-disable */
				switch (type) {
					case 'supplier':
						this.props.form.setFieldsValue({
							supplierName: name,
							supplierNumber: number,
							supplierId: id,
						})
						break;
					case 'warehouse':
						this.props.form.setFieldsValue({
							warehouseName: name,
							warehouseNumber: number,
							warehouseId: id,
						})
						break;
					case 'toWarehouse':
						this.props.form.setFieldsValue({
							toWarehouseName: name,
							toWarehouseNumber: number,
							toWarehouseId: id,
						})
						break;
					case 'fromWarehouse':
						this.props.form.setFieldsValue({
							fromWarehouseName: name,
							fromWarehouseNumber: number,
							fromWarehouseId: id,
						})

						if (!!this.props.byWarehouse) this.setState({ items: [] })

						break;
					default:
						break;
					/* eslint-enable */
				}
			}


			handleSubmit = async (pass) => {
				return await new Promise((reslove, reject) => {
					this.props.form.validateFields(async (err, values) => {
						if (!err) {

							Object.keys(values).forEach(key => {
								if (moment.isMoment(values[key])) values[key] = moment(values[key]).valueOf()
							})

							if (this.state.items.length == 0) return reject(Modal.error({
								title: '货品数据不能为空!'
							}))

							if (this.state.items.some(item => (!item.amount || item.amount > (!('availableInventory' in item) ? 99999 : item.availableInventory)))) return reject(Modal.error({
								title: this.props.byWarehouse ? '货品数量填写有误（货品数量不能大于可配库存数量）!' : '货品数量填写有误!'
							}))


							const result = {
								...values,
								id: this.id,
								items: this.state.items,
							}

							if (pass(result) === false) return reject()

							try {
								reslove(await this.create(result))
							} catch (err) {
								reject()
							}
						} else reject()
					})
				})
			}

			getData = async (id) => await get(`${this.props.backStore.url}/detail`, { id });
			create = async (query) => await post(`${this.props.backStore.url}/${!this.id ? 'create' : 'update'}`, query, { id: this.id });

			handleIpuntChange = (field, record, e) => {
				const { items } = this.state
				record[field] = typeof e !== 'object' ? e : e.target.value
				this.setState({ items })
			}

			deleteItem = (record) => {
				this.setState({
					items: this.state.items.filter(i => i !== record)
				})
			}

			update = (items) => this.setState({ items })

			render() {
				const { ready, items } = this.state

				const toWarehouseField = <this.ToWarehouseFormItem disabledId={this.props.form.getFieldsValue().fromWarehouseId} value={this.props.form.getFieldsValue().toWarehouseId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().toWarehouseName} />} />
				const fromWarehouseField = <this.FromWarehouseFormItem disabledId={this.props.form.getFieldsValue().toWarehouseId} value={this.props.form.getFieldsValue().fromWarehouseId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().fromWarehouseName} />} />
				const warehouseField = <this.WarehouseFormItem value={this.props.form.getFieldsValue().warehouseId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().warehouseName} />} />
				const supplierField = <this.SupplierFormItem value={this.props.form.getFieldsValue().supplierId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().supplierName} />} />

				const stocktakingsField = (props) => (
					(
						<this.WarehouseFormItem
							label="盘点仓店"
							props={props}
							value={this.props.form.getFieldsValue().warehouseId}
							BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().warehouseName} />}
						/>
					)
				)

				return (
					ready ? <WrappedComponent
						{...this.props}
						{...this.state}
						handleSubmit={this.handleSubmit}
						addItems={this.addItems}
						deleteItem={this.deleteItem}
						create={this.create}
						RenderUpload={this.RenderUpload}
						BackCreateHearder={this.BackCreateHearder}
						BindedFormItem={this.BindedFormItem}
						RenderCreateTable={this.RenderCreateTable}
						update={this.update}

						sequenceField={this.sequenceField}
						toWarehouseField={toWarehouseField}
						fromWarehouseField={fromWarehouseField}
						warehouseField={warehouseField}
						supplierField={supplierField}
						stocktakingsField={stocktakingsField}
					/>
						:
						(
							<div className="flex-center" style={{ height: '100%' }}>
								<div style={{ marginBottom: 200 }}>
									<div><Spin tip="单据加载中..." indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />} /></div>
								</div>
							</div>
						)
				)
			}
	}
}
