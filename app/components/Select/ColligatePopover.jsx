import React, { Component } from 'react'
import { Table, Button, Input } from 'antd'
import { observer, inject } from 'mobx-react'
import popover from 'hoc/popover'
import { get } from 'utils/request'

import BasicTable from 'components/Table/Basic'

const { Search } = Input


@inject('database')
@popover()
@observer
export default class extends Component {
	static defaultProps = {
		// api: 'api/suppliers/search',
		selectedRowKeys: [],
		title: '',
		dataType: 'warehouseData',
		onChange: () => { }
	}

	constructor(props) {
		super(props)

		this.columns = [
			{ width: 300, title: '名称', key: 'name', },
			{ width: 300, title: '编号', key: 'number', },
		]

		this.state = {
			// data: this.props.database.warehouseSearch,
			data: props.database[props.dataType],
			loading: false,
			selectedRowKeys: props.selectedRowKeys || [],
			selectedRows: [],
		}
	}

	// componentDidMount() {
	// 	this.getData()
	// }

	componentWillReceiveProps(nextProps) {
		const { selectedRowKeys = [] } = nextProps
		this.setState({
			selectedRowKeys
		})
	}

	// getData = async () => {
	// 	this.setState({ loading: true })
	// 	const { data } = await get(this.props.api, { query: this.query, size: 999 })
	// 	this.setState({ data, loading: false, item: data })
	// }

	onConfirm = () => {
		const { selectedRowKeys, selectedRows } = this.state
		this.props.onChange(selectedRowKeys, selectedRows)
		this.props.hide()
	}

	onSearch = (value) => {
		// const { value } = e.target
		const { data } = this.state

		const reg = new RegExp(value, 'gi')

		this.setState({
			data: this.props.database[this.props.dataType].map((record) => {
				const match = record.name.match(reg)

				if (!match) {
					return null
				}
				return {
					...record,
					name: (
						<span>
							{record.name.split(reg).map((text, i) => (
								i > 0 ? [<span key="highlight" style={{ color: '#f50' }}>{match[0]}</span>, text] : text
							))}
						</span>
					),
				}
			}).filter(Boolean),
		})
	}

	// onChange = (e) => {
	// 	const { value } = e.target
	// 	this.query = value

	// 	this.getData()
	// }

	onRowDoubleClick = (record) => {
		const { key } = record
		if (!this.props.radio || key == this.props.disabledId) return
		this.onConfirm()
	}

	onRowClick = (record) => {
		const { key } = record
		const { selectedRowKeys } = this.state


		if (this.props.radio) {
			if (key == this.props.disabledId) return

			this.setState({
				selectedRowKeys: [key],
				selectedRows: [record]
			})
			return
		}

		if (selectedRowKeys.includes(key)) {
			this.setState({
				selectedRowKeys: selectedRowKeys.filter(item => item !== key)
			})
		} else {
			this.setState({
				selectedRowKeys: [...selectedRowKeys, key]
			})
		}
	}

	render() {
		const { data, selectedRowKeys } = this.state

		const rowSelection = {
			type: this.props.radio ? 'radio' : 'checkbox',
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ selectedRowKeys, selectedRows })
			},
			selectedRowKeys,
			getCheckboxProps: record => {
				return ({
					disabled: record.id === this.props.disabledId, // Column configuration not to be checked
				})
			}
		}

		return (
			<div>
				<div className="pl15">
					<Search
						onSearch={this.onSearch}
						// onChange={this.onSearch}
						style={{ width: 250 }}
						placeholder="输入名称搜索..."
						enterButton
					/>
					<div style={{ minHeight: 400, margin: '20px 0' }}>
						<BasicTable
							columns={this.columns}
							onRow={(record) => ({
								onClick: this.onRowClick.bind(this, record),
								onDoubleClick: this.onRowDoubleClick.bind(this, record)
							})}
							rowSelection={rowSelection}
							scroll={{ y: 400 }}
							pagination={false}
							loading={this.state.loading}
							dataSource={data} />
					</div>
					<Button type="primary" className="mr20" onClick={this.onConfirm}>确定</Button>
					<Button onClick={this.props.hide}>取消</Button>
				</div>
			</div >
		)
	}
}
