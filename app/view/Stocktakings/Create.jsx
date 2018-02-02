import React, { Component } from 'react'
import { Button, Input, Form, DatePicker, Icon, Modal, Radio } from 'antd'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import { Container, Content, HandleArea } from 'components/Layout'
import SearchPro from 'components/SearchPro'
import BasicTable from 'components/Table/Basic'
import modal from 'hoc/modal'
import create from 'hoc/create-table'
import { monentToValue } from 'utils'
import { get, post, postByParam } from 'utils/request'

import styles from './style.less'

const RadioGroup = Radio.Group


@modal
class DiffModal extends Component {

	render() {
		const { HocModal } = this.props

		return (
			<HocModal
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
				width={1200}
			>
				<BasicTable
					className={styles.diff}
					dataSource={[
						{ id: 1, name: '大毛' },
						{ id: 11, name: '大毛' },
						{ id: 111, name: '大毛' },

					]}
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
		diffData: [],
		diffId: null,
		count: 0
	}

	columns = [
		{ width: 200, title: '货品', key: 'number' },
		{ width: 150, title: '货品名称', key: 'name' },
		{ width: 80, title: '采购价', key: 'costPrice' },
		{ width: 80, title: '结算价', key: 'price' },
		{ width: 100, title: '盘点数量', key: 'amount', edit: { type: 'number' } },
		{ width: 200, title: '备注', key: 'note', },
	]

	computedQuery = (value) => {
		value.items.forEach(item => {
			item.skuId = item.skuId || item.id
			delete item.id
		})
	}

	getDiffId = async (values) => {
		monentToValue(values)
		const { global, stocktakingDate, warehouseId } = values
		const { url } = this.props.backStore

		const items = this.props.items.map(item => ({
			skuId: item.id,
			amount: item.amount,
		}))

		const query = {
			items,
			global,
			stocktakingDate,
			warehouseId
		}

		const generateResponse = await post(`${url}/diff/generate`, query)
		const { diffId, count } = generateResponse.data
		// const { data: diffData } = await get(`${url}/diff`, { diffId })

		this.setState({
			diffId,
			count,
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

			stocktakingsField,
			sequenceField
		} = this.props

		const values = this.props.form.getFieldsValue()

		const isReadyDiff = !!(values.warehouseId && values.stocktakingDate)

		const hasDiffId = this.state.diffId

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
						title={() => (
							<div>
								<strong>单据明细编辑</strong>
								<SearchPro onChange={item => {
									addItems([item])
								}} />
								<RenderUpload columns={this.columns}><Button type="primary" icon="file-excel" ghost className="ml20">Excel导入商品</Button></RenderUpload>
								<Button
									onClick={() => this.getDiffId(values)}
									disabled={!isReadyDiff}
									className="ml30"
									type="primary"
									icon="line-chart">
									生成盘点差异
								</Button>
								<Button disabled={!isReadyDiff} className="ml30" type="primary" icon="sync">重新盘点</Button>

								<DiffModal
									showbefore={this.getDiffId.bind(this, values)}
									title="盘点差异">
									<Button disabled={!isReadyDiff} className="ml30" type="primary" icon="bars">查看差异情况</Button>
								</DiffModal>
							</div>)}
					/>
				</Content>
			</Container>
		)
	}
}
