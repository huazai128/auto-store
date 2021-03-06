import React, { Component } from 'react'
import { Table, Popconfirm, InputNumber, Input, Icon } from 'antd'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { getXSrcoll } from './utils'

import { formatValue } from 'utils'

/**
|--------------------------------------------------
| handleIpuntChange: () => {};
| columns: [];
| deleteItem: () => {};  //noDelete
|--------------------------------------------------
*/

@observer
export default class extends Component {
	static defaultProps = {
		columns: [],
	}

	constructor(props) {
		super(props)

		!props.noDelete && props.columns.push({
			width: 80,
			title: '',
			key: 'delete',
			render: (_, record) => {
				const style = {
					color: '#f04134',
					cursor: 'pointer',
					padding: 10,
				}

				return (
					<Popconfirm title='确定删除?' onConfirm={() => this.props.deleteItem(record)}>
						<span style={style}><Icon type="delete" /></span>
					</Popconfirm>
				)
			}
		})

		this.columns = props.columns.map(item => {
			if (item.edit) item.title = <div>{item.title}<Icon className="primary-6" type="edit" /></div>
			if (item.type == 'info') item.render = (text) => <p className="info-color">{text}</p>
			return {
				...item,
				dataIndex: item.key,
				render: item.render ? item.render : (text, record) => {
					if (item.edit) {
						const { type, ...inputProps } = item.edit
						if (type == 'number') return (
							<div>
								<InputNumber
									onChange={this.props.handleIpuntChange.bind(this, item.key, record)}
									value={text}
									style={{ width: 80 }}
									size="small"
									min={'min' in item.edit ? item.edit.min : 0}
									{...inputProps}
								/>
							</div>
						)
						else return (
							<div>
								<Input
									style={{ width: 100 }}
									size="small"
									value={text}
									onChange={this.props.handleIpuntChange.bind(this, item.key, record)}
									{...inputProps}
								/>
							</div>
						)
					}


					return formatValue(text, item.key)
				}
			}
		})
	}

	componentDidMount() {
		const otherH = 70
		this.tableInnerHeight = this.refs.wrap && this.refs.wrap.clientHeight - otherH
	}
	render() {
		this.props.items.forEach((i, index) => i.key = index)

		return (
			<div className="flex-g-1" ref="wrap">
				<Table
					className="main-table"
					size="middle"
					scroll={{ x: getXSrcoll(this.columns), y: this.tableInnerHeight || 600 }}
					title={this.props.title}
					dataSource={this.props.items}
					loading={false}
					pagination={false}
					columns={this.columns} />
			</div>
		)
	}
}
