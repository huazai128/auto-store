import React, { Component } from 'react';
import { Table, Tag, Popover, Tooltip, Button, Icon } from 'antd';
import { toJS } from 'mobx';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import CreateTable from './CreateTable';
import DyunFrom from 'components/Form';
import popover from 'hoc/popover';
import CustomHeader from './CustomHeader';
import { getXSrcoll } from './utils';
import { numeralNumber } from 'utils';


import BasicTable from './Basic';

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
@popover()
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
				try {
					await this.props.store.update(query);
					this.setState({ confirmLoading: false, }, this.props.hide);
				} catch (error) {
					this.setState({ confirmLoading: false, });
				}
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
		store: {},
	}

	// componentDidMount() {
	// 	const otherH = 18 + 26 + 34 + 56;
	// 	this.tableInnerHeight = this.refs.wrap && this.refs.wrap.clientHeight - otherH - 25;
	// }

	renderProductState(text, info = {}) {
		let tagNode = null;
		if (text == 'created') tagNode = <Tag color="#e2574c">未应用</Tag>;
		if (text == 'invoked') tagNode = <Tag color="#999">已应用</Tag>;
		if (text == 'invoked_no') tagNode = <Tag color="#3a99d9">已应用</Tag>;
		return (
			<StatePopover content={info[text]}>
				{tagNode}
			</StatePopover>
		);
	}

	renderStoreState(text, info = {}) {
		let tagNode = null;
		if (text == 'created_no') tagNode = <Tag color="#cfc044">合作中</Tag>;
		if (text == 'created') tagNode = <Tag color="#52c88f">合作中</Tag>;
		if (text == 'freeze') tagNode = <Tag color="#999">已冻结</Tag>;
		return (
			<StatePopover content={info[text]}>
				{tagNode}
			</StatePopover>
		);
	}

	renderState(text, info = {}) {
		if (info.type === 'product') return this.renderProductState(text, info);
		if (info.type === 'store') return this.renderStoreState(text, info);

		if (text == 'confirmed') return (
			<StatePopover content={info[text] || '已登账的单据，只可进行反登操作!'}>
				<Tag color="#999">已登账</Tag>
			</StatePopover>
		);

		if (text == 'checked') return (
			<StatePopover content={info[text] || '已审核过的单据，可直接登账操作，也可进行反审核操作!'}>
				<Tag color="#3a99d9">已审核</Tag>
			</StatePopover>
		);

		if (text == 'created') return (
			<StatePopover content={info[text] || '新建或未审核的单据，可进行审核操作，也可删除改单据!'}>
				<Tag color="#e2574c">待审核</Tag>
			</StatePopover>
		);

		return text;
	}

	render() {
		const { title, className, push, ...rest } = this.props;

		const {
			selectedRows = [],
			tableLoading,
			dataSource,
			onChangeTable,
			columns,
			count,
			RenderSupplierPopover,
			RenderWarehousePopover,
			RenderToWarehousePopover,
			RenderFromWarehousePopover
		} = this.props.store;

		const otherH = 18 + 26 + 34 + 56;
		const tableInnerHeight = this.refs.wrap && this.refs.wrap.clientHeight - otherH - 5;

		const filterColumns = columns.map(item => {
			item.title = item.title || item.mark;
			if (item.created && item.created.edit) item.title = <div className="primary-6">{item.title}</div>;

			// ============================================================
			if (item.key == 'toWarehouseIds') {
				item.title = <div className="flex-vcenter">{item.mark}<RenderToWarehousePopover /></div>;
				item.render = (_, record) => <div><p>{record.toWarehouseNumber}</p><p style={{ opacity: 0.67 }}>{record.toWarehouseName}</p></div>;
			}

			if (item.key == 'warehouseIds') {
				item.title = <div className="flex-vcenter">{item.mark}<RenderWarehousePopover /></div>;
				item.render = (_, record) => <div><p>{record.warehouseNumber}</p><p style={{ opacity: 0.67 }}>{record.warehouseName}</p></div>;
			}

			if (item.key == 'fromWarehouseIds') {
				item.title = <div className="flex-vcenter">{item.mark}<RenderFromWarehousePopover /></div>;
				item.render = (_, record) => <div><p>{record.fromWarehouseNumber}</p><p style={{ opacity: 0.67 }}>{record.fromWarehouseName}</p></div>;
			}

			if (item.key == 'supplierIds') {
				item.title = <div className="flex-vcenter">{item.mark}<RenderSupplierPopover /></div>;
				item.render = (_, record) => <div><p>{record.supplierNumber}</p><p style={{ opacity: 0.67 }}>{record.supplierName}</p></div>;
			}

			// ============================================================
			/* 单据明细 */
			if (item.key === 'view') {
				item.render = (_, record) => {
					if (!Array.isArray(record.items)) return;
					const { items, sequence, totalCostPrice, totalPrice } = record;

					return (
						<Popover trigger="click" placement="rightTop" title={<p style={{ margin: '5px 0' }}>单号：<strong className="primary-6">{sequence}</strong></p>} content={<div style={{ width: 875, minHeight: 400 }}>
							<BasicTable
								dataSource={items}
								columns={item.subColumns}
								hasIndex
								size="small"
								pagination={false}
								scroll={{ y: 400 }}
								title={() => (
									<div className="flex jc-between pr50">
										单据明细
										<p>
											<strong style={{ margin: '0 20px' }}>单据总采购价金额：{totalCostPrice || 0}</strong>
											<strong>单据总零售价金额：{totalPrice || 0}</strong>
										</p>
									</div>
								)}
							/>
						</div>}>
							<Button size="small"><Icon className="fs16" type="copy" /></Button>
						</Popover>
					);
				};
			}
			// ============================================================

			return {
				...item,
				dataIndex: item.key,
				className: 'text-overflow',
				render: item.render ? item.render : (text, record) => {

					if (item.type == 'date') return text && moment(text).format('YYYY.MM.DD');
					if (item.type == 'state') return this.renderState(text, item.stateInfo);

					if (item.created && item.created.edit) {
						return (
							<EditPopover title="修改资料：" item={item} record={record} store={this.props.store}>
								<div className="td-edit">{numeralNumber(text, item.key) || <br />}</div>
							</EditPopover>
						);
					}
					// return text;
					return <Tooltip placement="topLeft" title={text}>{numeralNumber(text, item.key)}</Tooltip>;
				}
			};
		}).filter(i => i.checked || i.fix);

		const rowSelection = {
			onChange: (_, selectedRows) => {
				this.props.store.handleSelection(selectedRows);
			},
			selectedRowKeys: selectedRows.map(i => i.key)
		};

		return (
			<div className="flex-g-1" ref="wrap">
				<Table
					className={`${className} ${this.props.edit ? 'edit' : ''} main-table`}
					size="middle"
					scroll={{ x: getXSrcoll(filterColumns), y: tableInnerHeight }}
					title={() => (
						<div className="flex-vcenter jc-between">
							<div><strong>{title}列表</strong>（共{count ? count : 0}个列表，已选<span className="primary-6">{selectedRows.length}</span>个）</div>
							<CustomHeader store={this.props.store}>
								<Button className="mr20" size="small" icon="table">自定义表头展示</Button>
							</CustomHeader>
						</div>
					)}
					dataSource={dataSource || []}
					onRow={(record) => ({
						// onClick: this.props.store.onRowClick.bind(this, record)
						onDoubleClick: () => this.props.store.onRowDoubleClick(record, push)
					})}
					onChange={onChangeTable}
					rowSelection={!this.props.noRowSelection ? rowSelection : null}
					loading={tableLoading}
					pagination={{ pageSize: 20, total: count }}
					columns={filterColumns}
					{...rest}
				/>
				{/* <div>这是一段文字</div> */}
			</div>
		);
	}
}
