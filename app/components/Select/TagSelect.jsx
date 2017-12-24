import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Cascader } from 'antd';

@inject('tag')
@observer
export default class extends Component {
	render() {
		return (
			<Cascader allowClear={false} {...this.props} options={this.props.tag.cascaderData} />
		);
	}
}
