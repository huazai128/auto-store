import React, { Component } from 'react';
import { Table, Popconfirm, InputNumber, Input, Icon } from 'antd';
import { observer } from 'mobx-react';

@observer
export default class extends Component {
	static defaultProps = {
		columns: [],
		items: [
			{ key: '1', number: 'test-10086', count: 100, contdsd: '123' },
			{ key: '234', number: 'test-10086', count: 100, contdsd: '123312' },
			{ key: '14', number: 'test-10086', count: 100, contdsd: '123' },
			{ key: '25', number: 'test-10086', count: 100, contdsd: '123312' },
			{ key: '16', number: 'test-10086', count: 100, contdsd: '123' },
		]
	}

	constructor(props) {
		super(props);

		!props.noDelete && props.columns.push({
			width: 80,
			title: '',
			key: 'delete',
			render: (_, record) => {
				const style = {
					color: '#f04134',
					cursor: 'pointer',
					padding: 10,
				};

				return (
					<Popconfirm title='确定删除?' onConfirm={() => this.deleteItem(record)}>
						<span style={style}><Icon type="delete" /></span>
					</Popconfirm>
				);
			}
		});

		this.columns = props.columns.map(item => {
			if (item.edit) item.title = <div className="color-6">{item.title}<Icon type="edit" /></div>;

			return {
				...item,
				dataIndex: item.key,
				render: item.render ? item.render : (text, record) => {
					if (item.edit) {
						const { type, ...inputProps } = item.edit;
						if (type == 'number') return (
							<div>
								<InputNumber
									onChange={this.handleIpuntChange.bind(this, item.key, record)}
									value={text}
									style={{ width: 80 }}
									size="small"
									{...inputProps}
								/>
							</div>
						);
						else return (
							<div>
								<Input
									style={{ width: 80 }}
									size="small"
									{...inputProps}
								/>
							</div>
						);
					}

					// ============================================================
					return text;
				}
			};
		});

		this.state = {
			items: this.props.items || []
		};
	}

	getItems = () => this.state.items
	addItems = (newItems = []) => {
		const { items } = this.state;
		this.setState({
			items: [...items, ...newItems]
		});
	}

	componentDidMount() {
		const otherH = 70;
		this.tableInnerHeight = this.refs.wrap && this.refs.wrap.clientHeight - otherH;
	}

	componentWillReceiveProps(nextProps) {
		const { items } = nextProps;
		this.setState({ items });
	}

	getXSrcoll(columns = []) {
		let x = 0;
		columns.forEach(items => x += items.width);
		return x;
	}

	handleIpuntChange = (field, record, e) => {
		const { items } = this.state;
		record[field] = typeof e !== 'object' ? e : e.target.value;
		this.setState({
			items
		});
	}

	deleteItem = (record) => {
		const { items } = this.state;
		this.setState({
			items: items.filter(i => i !== record)
		});
	}

	render() {
		return (
			<div className="flex-g-1" ref="wrap">
				<Table
					className="main-table"
					size="middle"
					scroll={{ x: this.getXSrcoll(this.columns), y: this.tableInnerHeight || 600 }}
					title={this.props.title}
					dataSource={this.state.items}
					loading={false}
					pagination={false}
					columns={this.columns} />
			</div>
		);
	}
}
