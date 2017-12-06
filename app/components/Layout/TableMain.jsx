import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';

export default class extends Component {
	constructor(props) {
		super(props);

		this.columns = props.columns.map(item => {
			return {
				...item,
				dataIndex: item.key,
				render: item.render ? item.render : (text) => {
					if (item.type == 'date') return moment(text).format('YYYY.MM.DD');
					return text;
				}
			};
		});
	}
	render() {
		console.log(this.columns);

		return (
			<Table
				className="main-table"
				size="middle"
				dataSource={this.props.dataSource || []}
				columns={this.columns} />
		);
	}
}
