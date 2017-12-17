import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
import { get } from 'utils';

const Option = Select.Option;

@inject('supplier')
@observer
export default class extends Component {
	state = {
		data: [],
	}

	async componentDidMount() {
		const { data } = await get('api/suppliers', { size: 9999 });
		this.setState({ data });
	}

	render() {
		return (
			<Select {...this.props} >
				{this.state.data.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
			</Select>
		);
	}
}
