import React, { Component } from 'react';
import { Table, Tag, Popover, Popconfirm, Tooltip } from 'antd';
import moment from 'moment';

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
);

export default class extends Component {
	static defaultProps = {
		loading: false
	}

	constructor(props) {
		super(props);

		this.columns = props.columns.map(item => {
			if (item.edit) item.title = <div className="color-6">{item.title}</div>;

			return {
				...item,
				dataIndex: item.key,
				className: 'text-overflow',
				render: item.render ? item.render : (text, record) => {
					if (item.type == 'date') return moment(text).format('YYYY.MM.DD');
					if (item.type == 'state') return this.renderState(text, item.stateInfo);
					if (item.edit) {
						return (
							<Popconfirm onConfirm={() => { }} placement="bottom" trigger="click" title="修改资料：">
								<div className="td-edit">{text}</div>
							</Popconfirm >
						);
					}
					return text;

					// return <Tooltip placement="topLeft" title={text}>{text}</Tooltip>;
				}
			};
		});
	}

	componentDidMount() {
		const otherH = 18 + 26 + 34 + 56;
		this.tableInnerHeight = this.refs.wrap.clientHeight - otherH;
	}

	renderState(text, info = {}) {
		if (text == 'confirmed') return (
			<StatePopover content={info.confirmed}>
				<Tag color="#999">已登账</Tag>
			</StatePopover>
		);

		if (text == 'checked') return (
			<StatePopover content={info.checked}>
				<Tag color="#3a99d9">已审核</Tag>
			</StatePopover>
		);

		if (text == 'pending') return (
			<StatePopover content={info.pending}>
				<Tag color="#e2574c">待审核</Tag>
			</StatePopover>
		);
	}

	getXSrcoll(columns = []) {
		let x = 0;
		columns.forEach(item => x += item.width);
		return x;
	}

	render() {
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			},
		};

		return (
			<div className="flex-g-1" ref="wrap">
				<Table
					className={`${this.props.className} main-table`}
					size="middle"
					scroll={{ x: this.getXSrcoll(this.columns), y: this.tableInnerHeight }}
					title={() => (
						<div className="flex jc-between">
							<div><strong>{this.props.title}列表</strong>（共1000个列表，已选<span className="color-6">100</span>个）</div>
							{/* <div>自定义表头展示</div> */}
						</div>
					)}
					dataSource={this.props.dataSource || []}
					rowSelection={!this.props.noRowSelection ? rowSelection : null}
					loading={this.props.loading}
					pagination={{ pageSize: 20 }}
					columns={this.columns} />
			</div>
		);
	}
}
