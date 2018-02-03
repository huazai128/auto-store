import React from 'react'
import { AutoComplete } from 'antd'
import { get } from 'utils/request'
import { observer } from 'mobx-react'

@observer
export default class Complete extends React.Component {
	state = {
		dataSource: [],
	}

	async componentDidMount() {
		this.getData()
	}

	getData = async (query = '') => {
		const { data } = await get('/api/skus/search', { query })
		this.setState({
			dataSource: data.map(item => ({ value: item.id, text: item.name, ...item }))
		})
	}

	handleSearch = (value) => {
		this.getData(value)
	}

	onSelect = async (value) => {
		const { id } = this.state.dataSource.find(item => item.value == value)
		const { data } = await get('/api/skus/detail', { id })
		this.props.onChange(data)
	}

	render() {
		const { dataSource } = this.state
		const { disabled  } = this.props

		return (
			<AutoComplete
				dataSource={dataSource}
				style={{ width: 200, margin: '0 10px', ...this.props.style }}
				onSelect={this.onSelect}
				disabled={disabled}
				onSearch={this.handleSearch}
				placeholder="搜索商品添加"
			/>
		)
	}
}
