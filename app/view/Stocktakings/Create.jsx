import React, { Component } from 'react'
import { Button, Input, Form, DatePicker, Icon, Modal, Radio } from 'antd'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import { Container, Content, HandleArea } from 'components/Layout'
import SearchPro from 'components/SearchPro'
import BasicTable from 'components/Table/Basic'
import modal from 'hoc/modal'
import create from 'hoc/create-table'
import { translateParams } from 'utils'
import { get, post, postByParam } from 'utils/request'

import styles from './style.less'

const RadioGroup = Radio.Group

const pageSize = 15

@modal
class DiffModal extends Component {
	render() {
		const { HocModal, diffData, loading, current, count } = this.props
		return (
			<HocModal
				afterClose={this.afterClose}
				onOk={() => this.props.handleCancel()}
				width={1300}
				maskClosable={false}
			>
				<BasicTable
					className={styles.diff}
					dataSource={diffData}
					loading={loading}
					columns={[
						{ title: '货品编号', key: 'skuNumber' },
						{ title: '货品名称', key: 'skuName' },
						{ title: '实盘数量', key: 'amount' },
						{ title: '系统库存', key: 'inventory' },
						{ title: '盘点差异数量', key: 'diff', type: 'error' },
						{ title: '采购价', key: 'costPrice' },
						{ title: '零售价', key: 'price' },
						{ title: '采购价总额', key: 'totalCostPrice' },
						{ title: '零售价总额', key: 'totalPrice' },
						{ title: '采购价总额差异', key: 'totalCostPriceDiff', type: 'error' },
						{ title: '零售价总额差异', key: 'totalPriceDiff', type: 'error' },
						// { title: '差异原因', key: 'diffNote' }
					]}
					pagination={{ current, total: count, pageSize }}
					onChange={this.props.onChange}
				/>
			</HocModal>
		)
	}
}



@inject(store => ({
	body: store.body,
	backStore: store.stocktakings,
	}))
@create({
	setFields: ['warehouse', 'stocktakingDate', 'global'],
	})
export default class extends Component {
	state = {
		loading: false,
		diffLoding: false,
		diffData: [],
		diffId: null,
		count: 0,
		current: 1,
	}

	columns = [
		{ width: 200, title: '货品编号', key: 'number' },
		{ width: 150, title: '货品名称', key: 'name' },
		{ width: 80, title: '采购价', key: 'costPrice' },
		{ width: 80, title: '零售价', key: 'price' },
		{ width: 100, title: '盘点数量', key: 'amount', edit: { type: 'number', min: -99999 } },
		// { width: 200, title: '备注', key: 'note', },
	]

	computedQuery = (value) => {
		if (!this.state.diffId) {
			Modal.error({
				title: '请先生成盘点差异'
			})
			return false
		}

		value.items.forEach(item => {
			item.skuId = item.skuId || item.id
			delete item.id
		})

		value.diffId = this.state.diffId
	}

	getDiffId = async (values) => {
		translateParams(values)
		const { global, stocktakingDate, warehouseId } = values
		const { url } = this.props.backStore

		const items = this.props.items.map(item => ({
			skuId: item.skuId || item.id,
			amount: item.amount,
		}))

		const query = {
			items,
			global,
			stocktakingDate,
			warehouseId
		}

		this.setState({ diffLoding: true })
		const generateResponse = await post(`${url}/diff/generate`, query)
		const { diffId, count } = generateResponse.data
		// const { data: diffData } = await get(`${url}/diff`, { diffId })

		this.setState({
			diffId,
			count,
			diffLoding: false,
		})
	}

	resetDiff = () => {
		Modal.confirm({
			title: '确认要重新进行盘点?',
			content: '重新盘点可以重新选择盘点条件，但是会清空现有的盘点差异。',
			okType: 'danger',
			onOk: () => {
				this.setState({
					diffId: null,
				})
			},
		})
	}

	getDiffItems = async () => {
		const { diffId, current } = this.state

		const params = {
			diffId,
			from: (current - 1) * pageSize,
			size: pageSize,
		}

		this.setState({ loading: true })
		const { url } = this.props.backStore
		const { data: diffData } = await get(`${url}/diff`, params)
		this.setState({ loading: false, diffData })
	}

	handleTableChange = (pagination) => {
		const { current } = pagination
		this.setState({ current }, this.getDiffItems)
	}

	render() {
		const {
			BackCreateHearder,
			RenderCreateTable,
			BindedFormItem,
			RenderUpload,
			handleSubmit,
			addItems,
			items,
			stocktakingsField,
			sequenceField
		} = this.props

		const values = this.props.form.getFieldsValue()

		const isReadyDiff = !!(values.warehouseId && values.stocktakingDate && items.length > 0)

		const hasDiffId = !!this.state.diffId

		return (
			<Container>
				<BackCreateHearder handleSubmit={() => this.props.handleSubmit(this.computedQuery)} />
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{sequenceField}
								{stocktakingsField({
									disabled: hasDiffId
								})}
								<BindedFormItem
									label="盘点日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="stocktakingDate"
								>
									<DatePicker disabled={hasDiffId} allowClear={false} />
								</BindedFormItem>
							</div>
							<div className="flex-vcenter">
								<BindedFormItem
									rules={true}
									label="盘点范围"
									keyValue="global"
									initialValue={true}
								>
									<RadioGroup disabled={hasDiffId}>
										<Radio value={true}>全局盘点</Radio>
										<Radio value={false}>局部盘点</Radio>
									</RadioGroup>
								</BindedFormItem>
								<BindedFormItem label="备注" keyValue="note">
									<Input style={{ width: 350 }} />
								</BindedFormItem>
							</div>
						</HandleArea>
					</Form>
					<RenderCreateTable
						columns={this.columns}
						noDelete={hasDiffId}
						title={() => (
							<div>
								<strong>单据明细编辑</strong>
								<SearchPro disabled={hasDiffId} onChange={item => {
									addItems([item])
								}} />
								<RenderUpload columns={this.columns}><Button type="primary" icon="file-excel" ghost className="ml20">Excel导入商品</Button></RenderUpload>
								{
									hasDiffId
										?
										<Button
											disabled={!isReadyDiff}
											className="ml30"
											onClick={this.resetDiff}
											type="danger"
											icon="sync">
											重新盘点
										</Button>
										:
										<Button
											onClick={() => this.getDiffId(values)}
											disabled={!isReadyDiff}
											className="ml30"
											type="primary"
											loading={this.state.diffLoding}
											icon="line-chart">
											生成盘点差异
										</Button>
								}
								<DiffModal
									{...this.state}
									showbefore={this.getDiffItems}
									onChange={this.handleTableChange}
									title="盘点差异">
									<Button disabled={!hasDiffId} className="ml30" type="primary" icon="bars">查看差异情况</Button>
								</DiffModal>
							</div>)}
					/>
				</Content>
			</Container>
		)
	}
}
