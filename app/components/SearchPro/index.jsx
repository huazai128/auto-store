import React from 'react';
import { AutoComplete } from 'antd';

function onSelect(value) {
	console.log('onSelect', value);
}

export default class Complete extends React.Component {
	state = {
		dataSource: [],
	}

	handleSearch = (value) => {
		this.setState({
			dataSource: !value ? [] : [
				value,
				value + value,
				value + value + value,
			],
		});
	}

	render() {
		const { dataSource } = this.state;
		return (
			<AutoComplete
				dataSource={dataSource}
				style={{ width: 200, margin: '0 10px', ...this.props.style }}
				onSelect={onSelect}
				onSearch={this.handleSearch}
				placeholder="搜索商品添加"
			/>
		);
	}
}
