import React, { Component } from 'react';
import { Table, Popconfirm, InputNumber } from 'antd';

export default class extends Component {
	static defaultProps = {
		columns: [
			{ width: 100, title: '款号', key: 'number' },
			{ width: 100, title: '数量', key: 'count' },
			{ width: 100, title: '数量fgfg', key: 'contdsd', render: () => <div><InputNumber style={{ width: 80 }} size="small" /></div> },
		],
		dataSource: [
			{ key: '1', number: 'test-10086', count: 100, contdsd: '123' },
			{ key: '2', number: 'test-10086', count: 100, contdsd: '123312' },
		]
	}

	constructor(props) {
		super(props);
		this.columns = props.columns.map(item => {

			return {
				...item,
				dataIndex: item.key,
				render: item.render ? item.render : (text, record) => {
					return text;
				}
			};
		});

		this.state = {
			item: this.props.item || []
		};
	}

	componentWillReceiveProps(nextProps) {
		const { item } = nextProps;
		this.setState({ item });
	}

	getXSrcoll(columns = []) {
		let x = 0;
		columns.forEach(item => x += item.width);
		return x;
	}

	handleIpuntChange = (field, record, e) => {
		const { item } = this.state;
		record[field] = typeof e !== 'object' ? e : e.target.value;
		this.setState({
			item
		});
	}

	render() {
		return (
			<Table
				className="main-table"
				size="middle"
				scroll={{ x: this.getXSrcoll(this.columns), y: 600 }}
				title={this.props.title}
				dataSource={this.props.dataSource || []}
				loading={false}
				pagination={false}
				columns={this.columns} />
		);
	}
}
