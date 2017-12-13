import React, { Component } from 'react';
import { Table, Tag, Popover, Tooltip, Button } from 'antd';
import { toJS } from 'mobx';
import moment from 'moment';
import { observer, inject } from 'mobx-react';

import DyunFrom from 'components/Form';
import popover from 'hoc/modal/popover';

/* 状态说明 */
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


/* 编辑popover */
@popover
@observer
class EditPopover extends Component {
	state = { confirmLoading: false, }

	handleSubmit = (e) => {
		e.preventDefault();
		this.refs.form.validateFields(async (err, values) => {

			if (!err) {
				const query = {
					...this.props.record,
					...values,
				};
				this.setState({ confirmLoading: true, });
				await this.props.store.update(query);
				this.setState({ confirmLoading: false, }, this.props.hide);
			}
		});
	}

	render() {
		const { item } = this.props;
		return (
			<div style={{ width: 300 }}>
				{this.props.visible ?
					<DyunFrom
						key="DyunFrom"
						formItemLayout={{
							labelCol: { span: 6 },
							wrapperCol: { span: 15 },
						}}
						ref="form"
						fields={[
							{ label: item.mark, key: item.key, ...item.created, initialValue: this.props.record[item.created.key || item.key] },
						]} /> : <div style={{ height: 50 }}></div>}
				<div className="flex jc-end pr20">
					<Button onClick={this.props.hide}>取消</Button>
					<Button loading={this.state.confirmLoading} onClick={this.handleSubmit} className="ml20" type="primary">确定</Button>
				</div>
			</div>
		);
	}
}


/**
|--------------------------------------------------
| export default class table
| main modules
|--------------------------------------------------
*/
@observer
export default class extends Component {
	static defaultProps = {
		loading: false,
		store: {},
	}

	constructor(props) {
		super(props);

		this.columns = props.columns.map(item => {
			item.title = item.title || item.mark;
			if (item.created && item.created.edit) item.title = <div className="color-6">{item.title}</div>;

			return {
				...item,
				dataIndex: item.key,
				className: 'text-overflow',
				render: item.render ? item.render : (text, record) => {
					if (item.type == 'date') return moment(text || new Date().valueOf()).format('YYYY.MM.DD');
					if (item.type == 'state') return this.renderState(text, item.stateInfo);
					if (item.created && item.created.edit) {

						return (
							<EditPopover title="修改资料：" item={item} record={record} store={this.props.edit.store}>
								<div className="td-edit">{text || <br />}</div>
							</EditPopover>
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
		this.tableInnerHeight = this.refs.wrap && this.refs.wrap.clientHeight - otherH - 25;
	}

	renderProductState(text, info = {}) {
		if (text == 'created') return (
			<StatePopover content={info.created}>
				<Tag color="#e2574c">未应用</Tag>
			</StatePopover>
		);

		if (text == 'invoke') return (
			<StatePopover content={info.invoke}>
				<Tag color="#999">已应用</Tag>
			</StatePopover>
		);

		if (text == 'invoke_no') return (
			<StatePopover conteent={info.invoke_no}>
				<Tag color="#3a99d9">已应用</Tag>
			</StatePopover>
		);
	}

	renderStoreState(text, info = {}) {
		if (text === 'created_no') return (
			<StatePopover content={info.created_no}>
				<Tag color="#cfc044">合作中</Tag>
			</StatePopover>
		);
		if (text === 'created') return (
			<StatePopover content={info.created}>
				<Tag color="#52c88f">合作中</Tag>
			</StatePopover>
		);
		if (text === 'freeze') return (
			<StatePopover content={info.freeze}>
				<Tag color="#999">已冻结</Tag>
			</StatePopover>
		);
	}

	renderState(text, info = {}) {
		if (info.type === 'product') return this.renderProductState(text, info);
		if (info.type === 'store') return this.renderStoreState(text, info);

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
			<StatePopover conteent={info.pending}>
				<Tag color="#e2574c">待审核</Tag>
			</StatePopover>
		);

		return text;
	}

	getXSrcoll(columns = []) {
		let x = 0;
		columns.forEach(item => x += item.width);
		return x;
	}

	render() {
		const { selectedRows = [] } = this.props.store;

		const rowSelection = {
			onChange: (_, selectedRows) => {
				this.props.store.handleSelection(selectedRows);
			},
			selectedRowKeys: selectedRows.map(i => i.key)
		};

		return (
			<div className="flex-g-1" ref="wrap">
				<Table
					className={`${this.props.className} ${this.props.edit ? 'edit' : ''} main-table`}
					size="middle"
					scroll={{ x: this.getXSrcoll(this.columns), y: this.tableInnerHeight }}
					title={() => (
						<div className="flex-vcenter jc-between">
							<div><strong>{this.props.title}列表</strong>（共{this.props.pagination ? this.props.pagination.total : 0}个列表，已选<span className="color-6">{selectedRows.length}</span>个）</div>
							<Button className="mr20" size="small" icon="table">自定义表头展示</Button>
						</div>
					)}
					dataSource={this.props.dataSource || []}
					rowSelection={!this.props.noRowSelection ? rowSelection : null}
					loading={this.props.loading}
					pagination={{ pageSize: 20, ...this.props.pagination }}
					columns={this.columns} />
			</div>
		);
	}
}
