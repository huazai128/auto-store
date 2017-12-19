import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon, Modal, Row, Col } from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import CreateHearder from 'components/Header/CreateHearder';
import { Container, Content, HandleArea } from 'components/Layout';
import SearchPro from 'components/SearchPro';
import Upload from 'components/Upload';
import BasicTable from 'components/Table/Basic';
import { get } from 'utils';
import create from 'hoc/create-table';
import modal from 'hoc/modal';

import styles from './style.scss';


const columns = [
	{ width: 15, title: '', key: 'dilidili', render: () => <Icon className="fs16 color-6" type="link" /> },
	{ width: 100, title: '货品名', key: 'name', },
	{ width: 30, title: '', key: 'delete', render: () => <Icon type="delete" /> }
];

const columns2 = [
	{ width: 150, title: '采购单号', key: 'sequence', },
	{ width: 180, title: '收货仓店编号及名称', key: 'warehouse', },
	{ width: 180, title: '供应商编号及名称', key: 'supplier', },
	{ width: 80, title: '采购数量', key: 'amount', },
	{ width: 80, title: '已入库数', key: 'stockInAmount', },
	{ width: 80, title: '未入库数', key: 'unbound', },
	{ width: 80, title: '可绑定入库数', key: 'bound', },
];


@modal
@observer
class ReferModal extends Component {
	state = {
		data: [],
		record: {},
	}

	handleSubmit = () => {
		this.props.handleCancel();
	}

	onRowClick = (record) => {
		this.setState({ record });
	}

	addPro = async (item) => {
		const { id: skuId } = item;
		const { supplierId } = this.props;
		const { data } = await get('/api/purchaseOrders/forStockIn', { skuId, supplierId });

		data.forEach(item => {
			item.unbound = item.amount - item.stockInAmount;
			item.bound = item.amount - item.boundStockInAmount;
		});

		item.orderAmountMap = data;

		this.setState({
			data: [item]
		});
	}


	render() {
		const { HocModal, supplierId } = this.props;
		const { data, record } = this.state;

		const { orderAmountMap = [] } = record;

		return (
			<HocModal
				title={<div className="flex-vcenter jc-between">
					<div>参照制单</div>
					<div className="flex" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
						<div><Icon className="fs16 color-6 mr10" type="link" /><span className="fs12">货品<span className="color-6">已绑定</span>采购单</span></div>
						<div><Icon className="fs16 ml50 mr10" type="link" /><span className="fs12">货品未绑定采购单</span></div>
					</div>
				</div>}
				maskClosable={false}
				width={1300}
				closable={false}
				onOk={this.handleSubmit}
			>
				<Row>
					<Col className={styles.left} span={5}>
						<div style={{ padding: 10 }}>
							<div>
								<strong className="mr20">添加入库货品</strong>
								<Upload columns={this.columns}><Button type="primary" ghost className="ml20">Excel导入商品</Button></Upload>
							</div>
							<div className="mt10"><SearchPro onChange={item => this.addPro(item)} /></div>
						</div>
						<div>
							<BasicTable
								onRow={(record, index) => ({
									onClick: this.onRowClick.bind(this, record)
								})}
								scroll={{ y: 360 }}
								dataSource={data}
								rowClassName={(record) => {
									return record === this.state.record ? 'active' : '';
								}}
								columns={columns}
								pagination={false} />
						</div>
					</Col>
					<Col className={styles.right} span={19}>
						<BasicTable
							columns={columns2}
							dataSource={orderAmountMap}
							scroll={{ y: 450 }}
							title={() => {
								return <div>{record.name ? <div>商品<span className="color-6">{record.name}</span>对应可参照采购单</div> : <strong>请在左侧添加参照商品</strong>}</div>;
							}}
							pagination={false} />
					</Col>
				</Row>
			</HocModal>
		);
	}
}


@inject(store => ({
	body: store.body,
	distributions: store.distributions,
}))
@create({
	url: 'api/distributions',
})
export default class extends Component {
	columns = [
		{ width: 200, title: '款号', key: 'number' },
		{ width: 150, title: '款号名称', key: 'name' },
		{ width: 80, title: '品类', key: 'bigStyle' },
		{ width: 80, title: '采购价', key: 'costPrice' },
		{ width: 80, title: '结算价', key: 'price' },
		{ width: 100, title: '数量', key: 'amount', edit: { type: 'number' } },
		{ width: 200, title: '备注', key: 'note', },
	]

	cb = () => {
		this.props.body.remove(this.props.pathname, this.props.push);
		this.props.distributions.getData();
	}

	computedQuery = (value) => {
		// value.items.forEach(item => {
		// 	item.skuId = item.id;
		// 	delete item.id;
		// });
	}

	render() {
		const {
			RenderCreateTable,
			BindedFormItem,
			RenderUpload,
			handleSubmit,
			addItems,

			toWarehouseField,
			fromWarehouseField,
			warehouseField,
			supplierField
		} = this.props;

		return (
			<Container>
				<CreateHearder cb={this.cb} handleSubmit={() => this.props.handleSubmit(this.computedQuery)}>{this.props.name}</CreateHearder>
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{this.props.params.id && <BindedFormItem label="单号" keyValue="sequence">
									<Input style={{ width: 200 }} disabled />
								</BindedFormItem>}
								<BindedFormItem label="到货日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="shipDate"
								>
									<DatePicker allowClear={false} />
								</BindedFormItem>
								{warehouseField}
								{supplierField}
							</div>
							<div className="flex-vcenter">
								<BindedFormItem label="备注" keyValue="note">
									<Input style={{ width: 350 }} />
								</BindedFormItem>
							</div>
						</HandleArea>
					</Form>
					<RenderCreateTable
						columns={this.columns}
						title={() => (
							<div>
								<strong>单据明细编辑</strong>
								<ReferModal supplierId={this.props.form.getFieldsValue().supplierId}><Button type="primary" className="ml20">参照制单</Button></ReferModal>
							</div>)}
					/>
				</Content>
			</Container>
		);
	}
}
