import React, { Component } from 'react'
import { Table, Tag, Popover, Tooltip, Button, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import DyunFrom from 'components/Form'
import popover from 'hoc/popover'
import CustomHeader from './CustomHeader'
import { getXSrcoll, analyzeKey } from './utils'
import { formatValue } from 'utils'
import numeral from 'numeral'
import ColligatePopoverBinded from 'components/Select/ColligatePopoverBinded'

import BasicTable from './Basic'

/* 状态说明 */
const StatePopover = ({ content = '', children }) => (
	content
		?
		<Popover
			overlayStyle={{ width: 222 }}
			trigger="hover"
			placement="right"
			title="状态说明："
			content={content}>
			{children}
		</Popover>
		:
		<div>{children}</div>
)


/* 编辑popover */
@popover()
@observer
class EditPopover extends Component {
	state = { confirmLoading: false, }

	handleSubmit = (e) => {
		e.preventDefault()
		this.refs.form.validateFields(async (err, values) => {

			// 特殊处理values
			values = this.props.item.created.confirmAfter ? this.props.item.created.confirmAfter(values) : values

			if (!err) {
				const query = {
					...this.props.record,
					...values,
				}
				this.setState({ confirmLoading: true, })
				try {
					await this.props.store.update(query)
					this.setState({ confirmLoading: false, }, this.props.hide)
				} catch (error) {
					this.setState({ confirmLoading: false, })
				}
			}
		})
	}

	render() {
		const { item, record } = this.props
		const initialValue = item.created.initValue ? item.created.initValue(record) : this.props.record[item.created.key || item.key]

		return (
			<div style={{ width: 300 }}>
				{this.props.visible ?
					<DyunFrom
						key="DyunFrom"
						formItemLayout={{
							labelCol: { span: 6 },
							wrapperCol: { span: 15 },
						}}
						ref="form"
						fields={[
							{ label: item.mark, key: item.key, ...item.created, initialValue },
						]} /> : <div style={{ height: 50 }}></div>}
				<div className="flex jc-end pr20">
					<Button onClick={this.props.hide}>取消</Button>
					<Button loading={this.state.confirmLoading} onClick={this.handleSubmit} className="ml20" type="primary">确定</Button>
				</div>
			</div>
		)
	}
}


/**
|--------------------------------------------------
| export default class table
| main modules
|--------------------------------------------------
*/
@observer
export default class extends Component {
	static defaultProps = {
		store: {},
	}

	renderProductState(text, info = {}) {
		let tagNode = null
		if (text == 'created') tagNode = <Tag color="#e2574c">未应用</Tag>
		if (text == 'invoked') tagNode = <Tag color="#999">已应用</Tag>
		if (text == 'invoked_no') tagNode = <Tag color="#3a99d9">已应用</Tag>
		return (
			<StatePopover content={info[text]}>
				{tagNode}
			</StatePopover>
		)
	}

	renderStoreState(text, info = {}) {
		let tagNode = null
		if (text == 'created_no') tagNode = <Tag color="#cfc044">合作中</Tag>
		if (text == 'created') tagNode = <Tag color="#52c88f">合作中</Tag>
		if (text == 'freeze') tagNode = <Tag color="#999">已冻结</Tag>
		return (
			<StatePopover content={info[text]}>
				{tagNode}
			</StatePopover>
		)
	}

	renderState(text, info = {}) {
		if (info.type === 'product') return this.renderProductState(text, info)
		if (info.type === 'store') return this.renderStoreState(text, info)

		if (text == 'confirmed') return (
			<StatePopover content={info[text] || '已登账的单据，只可进行反登操作!'}>
				<Tag color="#999">已登账</Tag>
			</StatePopover>
		)

		if (text == 'checked') return (
			<StatePopover content={info[text] || '已审核过的单据，可直接登账操作，也可进行反审核操作!'}>
				<Tag color="#3a99d9">已审核</Tag>
			</StatePopover>
		)

		if (text == 'created') return (
			<StatePopover content={info[text] || '新建或未审核的单据，可进行审核操作，也可删除改单据!'}>
				<Tag color="#e2574c">待审核</Tag>
			</StatePopover>
		)
		return text
	}

	getInnerHeight() {
		const otherH = 18 + 26 + 34 + 56
		const tableInnerHeight = this.refs.wrap && this.refs.wrap.clientHeight - otherH - 5
		return tableInnerHeight
	}

	appendColligateTitle(item) {
		const { key } = item
		const popoverMap = [
			'warehouse',
			'supplier',
			'toWarehouse',
			'fromWarehouse',
		]

		item.title = item.title || item.mark
		if (popoverMap.includes(key)) item.title = <div className="flex-vcenter">{item.mark}<ColligatePopoverBinded store={this.props.store} type={key} /></div>
		if (item.created && item.created.edit) item.title = <div className="primary-6">{item.title}</div>
	}

	viewDetail(item) {
		item.render = (_, record) => {
			if (!Array.isArray(record.items)) return
			const { items, sequence, totalCostPrice, totalPrice } = record

			return (
				<Popover trigger="click" placement="rightTop" title={<p style={{ margin: '5px 0' }}>单号：<strong className="info-color">{sequence}</strong></p>} content={<div onDoubleClick={e => e.stopPropagation()} onClick={e => e.stopPropagation()} style={{ width: 875, minHeight: 400 }}>
					<BasicTable
						dataSource={items}
						columns={item.subColumns}
						size="small"
						pagination={false}
						scrollY={400}
						title={() => (
							<div className="flex jc-between pr50">
								<strong>单据明细</strong>
								{!('hideCollect' in item) && <p>
									<strong style={{ margin: '0 20px' }}>单据总采购价金额：{numeral(totalCostPrice).format('0,0[.]00') || 0}</strong>
									<strong>单据总零售价金额：{numeral(totalPrice).format('0,0[.]00') || 0}</strong>
								</p>}
							</div>
						)}
					/>
				</div>}>
					<Button size="small"><Icon className="fs16" type="copy" /></Button>
				</Popover>
			)
		}
	}

	render() {
		const { title, className, push, ...rest } = this.props
		const {
			selectedRows = [],
			tableLoading,
			dataSource,
			onChangeTable,
			columns,
			count,
			pageSize,
		} = this.props.store

		const tableInnerHeight = this.getInnerHeight()

		const filterColumns = columns.map(item => {
			this.appendColligateTitle(item)
			analyzeKey(item)
			if (item.key === 'view') this.viewDetail(item)
			return {
				...item,
				dataIndex: item.key,
				className: 'text-overflow',
				render: item.render ? item.render : (text, record) => {
					if (item.type == 'state') return this.renderState(text, item.stateInfo)
					if (item.created && item.created.edit && !(item.created.limit && item.created.limit(record))) {
						return (
							<EditPopover title="修改资料：" item={item} record={record} store={this.props.store}>
								<div className="td-edit">{formatValue(text, item.key) || <br />}</div>
							</EditPopover>
						)
					}
					// return <Tooltip placement="topLeft" title={formatValue(text, item.key)}>{formatValue(text, item.key)}</Tooltip>
					return formatValue(text, item.key)
				}
			}
		}).filter(i => i.checked || i.fix)

		const rowSelection = {
			onChange: (_, selectedRows) => {
				this.props.store.handleSelection(selectedRows)
			},
			selectedRowKeys: selectedRows.map(i => i.key)
		}

		return (
			<div className="flex-g-1" ref="wrap">
				<Table
					className={`${className} ${this.props.edit ? 'edit' : ''} main-table`}
					size="middle"
					scroll={{ x: getXSrcoll(filterColumns), y: tableInnerHeight }}
					title={() => (
						<div className="flex-vcenter jc-between">
							<div><strong>{title}列表</strong>（共{count ? count : 0}个列表，已选<span className="primary-6">{selectedRows.length}</span>个）</div>
							<CustomHeader store={this.props.store}>
								<Button className="mr20" size="small" icon="table">自定义表头展示</Button>
							</CustomHeader>
						</div>
					)}
					dataSource={dataSource || []}
					onRow={(record) => ({
						onDoubleClick: () => this.props.store.onRowDoubleClick(record, push)
					})}
					onChange={onChangeTable}
					rowSelection={!this.props.noRowSelection ? rowSelection : null}
					// loading={!rest.loading ? tableLoading : rest.loading}
					loading={tableLoading}
					pagination={{ pageSize, total: count, current: (this.props.store.query.from / pageSize) + 1 }}
					columns={filterColumns}
					{...rest}
				/>
			</div>
		)
	}
}
