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
				url,
				...reset
			});

			this.RenderCreateTable = (props) => React.cloneElement(<Table />, {
				deleteItem: this.deleteItem,
				handleIpuntChange: this.handleIpuntChange,
				items: this.state.items,
				...props
			});

			this.state = {
				items: [
					{
						id: 3,
						skuId: 3,
						name: '瞄99',
						number: 'test-sku-003',
						amount: 3
					},
				],
				ready: true,
			};

			// ============================================================
			this.WarehouseFormItem = ({ label = '仓库编号及名称', BottomNode = null, value }) => (
				<ComprehensivePopover selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'warehouse')}>
					<this.BindedFormItem keyValue="warehouseId" />
					<this.BindedFormItem keyValue="warehouseName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="warehouseNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			// ============================================================
			this.ToWarehouseFormItem = ({ label = '收货仓编号及名称', BottomNode = null, value, disabledId }) => (
				<ComprehensivePopover disabledId={disabledId} selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'toWarehouse')}>
					<this.BindedFormItem keyValue="toWarehouseId" />
					<this.BindedFormItem keyValue="toWarehouseName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="toWarehouseNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			// ============================================================
			this.FromWarehouseFormItem = ({ label = '供货仓编号及名称', BottomNode = null, value, disabledId }) => (
				<ComprehensivePopover disabledId={disabledId} selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'fromWarehouse')}>
					<this.BindedFormItem keyValue="fromWarehouseId" />
					<this.BindedFormItem keyValue="fromWarehouseName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="fromWarehouseNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			// ============================================================
			this.SupplierFormItem = ({ label = '供应商编号及名称', BottomNode = null, value }) => (
				<ComprehensivePopover selectedRowKeys={[value]} radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'supplier')}>
					<this.BindedFormItem keyValue="supplierId" />
					<this.BindedFormItem keyValue="supplierName" />
					<this.BindedFormItem BottomNode={BottomNode} label={label} rules={true} keyValue="supplierNumber">
						<Input suffix={<Icon type="ellipsis" />} readOnly style={{ width: 200 }} />
					</this.BindedFormItem>
				</ComprehensivePopover>
			);

			this.BottomNode = ({ name }) => name ? <div className="mt5 ml10"><Badge status="processing" /><span style={{ marginRight: 15 }}>{name}</span></div> : null;
		}

		async componentDidMount() {
			if (this.id) {
				this.setState({ ready: false, });
				const { data } = await get(`${url}/detail`, { id: this.id });
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

							console.log(values);

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

			getData = async (id) => await get(`${url}/detail`, { id });
			create = async (query) => await post(`${url}/create`, query);

			handleIpuntChange = (field, record, e) => {
				const { items } = this.state;
				record[field] = typeof e !== 'object' ? e : e.target.value;
				this.setState({ items });
			}

			deleteItem = (record) => {
				this.setState({
					items: this.state.items.filter(i => i !== record)
				});
			}

			render() {
				const { ready } = this.state;

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
						create={this.create}
						RenderUpload={this.RenderUpload}
						BindedFormItem={this.BindedFormItem}
						RenderCreateTable={this.RenderCreateTable}

						toWarehouseField={toWarehouseField}
						fromWarehouseField={fromWarehouseField}
						warehouseField={warehouseField}
						supplierField={supplierField}
					/> : 'loading...'
				);
			}
	};
};
