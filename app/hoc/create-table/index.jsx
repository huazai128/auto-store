import React, { Component } from 'react';
import Table from 'components/Table/CreateTable';
import { Form, Modal, Input, Icon, Badge } from 'antd';
import { observer, inject } from 'mobx-react';
import { filterRepeat } from 'utils';
import { get, post, postByParam } from 'utils';
import Upload from 'components/Upload';
import CreateFormItem from 'components/Form/CreateFormItem';
import ComprehensivePopover from 'components/Select/comprehensive-popover';
import moment from 'moment';
import CreateHearder from 'components/Header/CreateHearder';


@Form.create()
export default (options = {}) => WrappedComponent => {
	const { url } = options;

	return class extends React.Component {

		constructor(props) {
			super(props);

			this.id = this.props.params.id;

			const { getFieldDecorator } = props.form;
			this.BindedFormItem = ({ children, ...reset }) => React.cloneElement(<CreateFormItem>{children}</CreateFormItem>, { getFieldDecorator, ...reset });
			this.RenderUpload = ({ children, ...reset }) => React.cloneElement(<Upload>{children}</Upload>, {
				handleConfirm: this.addItems,
				url:this.props.backStore.url,
				...reset
			});

			this.RenderCreateTable = (props) => React.cloneElement(<Table />, {
				deleteItem: this.deleteItem,
				handleIpuntChange: this.handleIpuntChange,
				items: this.state.items,
				...props
			});

			this.state = {
				items: [],
				ready: true,
			};

			// ============================================================
			this.WarehouseFormItem = ({ label = '仓库编号及名称', BottomNode = null, value }) => (
				<ComprehensivePopover title="请选择仓库" selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'warehouse')}>
					<this.BindedFormItem keyValue="warehouseId" />
					<this.BindedFormItem keyValue="warehouseName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="warehouseNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			// ============================================================
			this.ToWarehouseFormItem = ({ label = '收货仓编号及名称', BottomNode = null, value, disabledId }) => (
				<ComprehensivePopover title="请选择收货仓" disabledId={disabledId} selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'toWarehouse')}>
					<this.BindedFormItem keyValue="toWarehouseId" />
					<this.BindedFormItem keyValue="toWarehouseName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="toWarehouseNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			// ============================================================
			this.FromWarehouseFormItem = ({ label = '供货仓编号及名称', BottomNode = null, value, disabledId }) => (
				<ComprehensivePopover title="请选择供货仓" disabledId={disabledId} selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'fromWarehouse')}>
					<this.BindedFormItem keyValue="fromWarehouseId" />
					<this.BindedFormItem keyValue="fromWarehouseName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="fromWarehouseNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			// ============================================================
			this.SupplierFormItem = ({ label = '供应商编号及名称', BottomNode = null, value }) => (
				<ComprehensivePopover title="请选择供应商" selectedRowKeys={[value]} radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'supplier')}>
					<this.BindedFormItem keyValue="supplierId" />
					<this.BindedFormItem keyValue="supplierName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="supplierNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			this.BottomNode = ({ name }) => name ? <div className="mt5 ml10"><Badge status="processing" /><span style={{ marginRight: 15 }}>{name}</span></div> : null;

			this.BackCreateHearder = (props) => React.cloneElement(<CreateHearder>{this.props.name}</CreateHearder>, {
				cb: this.cb,
				...props
			});
		}

		async componentDidMount() {
			if (this.id) {
				this.setState({ ready: false, });
				const { data } = await get(`${this.props.backStore.url}/detail`, { id: this.id });
				const fields = data[0];

				this.setState({
					ready: true,
					items: fields.items
				});
				this.props.form.setFieldsValue({
					sequence: fields.sequence
				});
			}
		}

		cb = () => {
			this.props.body.remove(this.props.pathname, this.props.push);
			this.props.backStore.getData();
		}


		addItems = (newItems = []) => {
			const data = filterRepeat([...this.state.items, ...newItems], 'id');
			this.setState({
				items: data,
			});
		}

		onConfirmPopover = (record, type) => {
			if (!record || !type) return;

			const { name, number, id } = record;
			/* eslint-disable */
			switch (type) {
				case 'supplier':
					this.props.form.setFieldsValue({
						supplierName: name,
						supplierNumber: number,
						supplierId: id,
					})
					break;
				case 'warehouse':
					this.props.form.setFieldsValue({
						warehouseName: name,
						warehouseNumber: number,
						warehouseId: id,
					})
					break;
				case 'toWarehouse':
					this.props.form.setFieldsValue({
						toWarehouseName: name,
						toWarehouseNumber: number,
						toWarehouseId: id,
					})
					break;
				case 'fromWarehouse':
					this.props.form.setFieldsValue({
						fromWarehouseName: name,
						fromWarehouseNumber: number,
						fromWarehouseId: id,
					})
					break;
				default:
					break;
				/* eslint-enable */
			}
		}


		handleSubmit = async (pass) => {
			return await new Promise((reslove, reject) => {
				this.props.form.validateFields(async (err, values) => {
					if (!err) {
						for (const key in values) {
							if (values[key] && values[key].constructor.name == 'Moment') values[key] = moment(values[key]).valueOf();
						}

						if (this.state.items.length == 0) return reject(Modal.error({
							title: '货品数据不能为空!'
						}));

						if (this.state.items.some(item => !item.amount)) return reject(Modal.error({
							title: '货品数量填写有误!'
						}));

						const result = {
							...values,
							items: this.state.items,
						};

						pass(result);

						try {
							reslove(await this.create(result));
						} catch (err) {
							reject();
						}
					} else reject();
				});
			});
		}

		getData = async (id) => await get(`${this.props.backStore.url}/detail`, { id });
		create = async (query) => await post(`${this.props.backStore.url}/create`, query);

		handleIpuntChange = (field, record, e) => {
			const { items } = this.state;
			record[field] = typeof e !== 'object' ? e : e.target.value;
			this.setState({ items });
		}

		deleteItem = (record) => {
			// const items = this.state.items.filter(i => i !== record);
			this.setState({
				items: this.state.items.filter(i => i !== record)
			});
		}

		update = () => {
			this.setState({});
		}

		render() {
			const { ready, items } = this.state;

			console.log(this.props);

			const toWarehouseField = <this.ToWarehouseFormItem disabledId={this.props.form.getFieldsValue().fromWarehouseId} value={this.props.form.getFieldsValue().toWarehouseId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().toWarehouseName} />} />;
			const fromWarehouseField = <this.FromWarehouseFormItem disabledId={this.props.form.getFieldsValue().toWarehouseId} value={this.props.form.getFieldsValue().fromWarehouseId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().fromWarehouseName} />} />;
			const warehouseField = <this.WarehouseFormItem value={this.props.form.getFieldsValue().warehouseId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().warehouseName} />} />;
			const supplierField = <this.SupplierFormItem value={this.props.form.getFieldsValue().supplierId} BottomNode={<this.BottomNode name={this.props.form.getFieldsValue().supplierName} />} />;

			return (
				ready ? <WrappedComponent
					{...this.props}
					{...this.state}
					handleSubmit={this.handleSubmit}
					addItems={this.addItems}
					deleteItem={this.deleteItem}
					create={this.create}
					RenderUpload={this.RenderUpload}
					BackCreateHearder={this.BackCreateHearder}
					BindedFormItem={this.BindedFormItem}
					RenderCreateTable={this.RenderCreateTable}
					update={this.update}

					toWarehouseField={toWarehouseField}
					fromWarehouseField={fromWarehouseField}
					warehouseField={warehouseField}
					supplierField={supplierField}
				/> : 'loading...'
			);
		}
	};
};
