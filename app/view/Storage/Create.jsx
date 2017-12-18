import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon, Modal, Row, Col } from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import CreateHearder from 'components/Header/CreateHearder';
import { Container, Content, HandleArea } from 'components/Layout';
import SearchPro from 'components/SearchPro';
import Upload from 'components/Upload';
import BasicTable from 'components/Table/Basic';

import create from 'hoc/create-table';
import modal from 'hoc/modal';

import styles from './style.scss';


const columns = [
	{ width: 15, title: '', key: 'dilidili', render: () => <Icon className="fs16 color-6" type="link" /> },
	{ width: 100, title: '货品名', key: 'name', },
	{ width: 30, title: '', key: 'delete', render: () => <Icon type="delete" /> }
];

const columns2 = [
	{ width: 150, title: '采购单号', key: 'a', },
	{ width: 150, title: '收货仓店编号及名称', key: 'b', },
	{ width: 150, title: '供应商编号及名称', key: 'c', },
	{ width: 80, title: '计划完成', key: 'd', },
	{ width: 80, title: '采购数量', key: 'e', },
	{ width: 80, title: '已入库数', key: 'f', },
	{ width: 80, title: '未入库数', key: 'g', },
	{ width: 100, title: '可绑定入库数', key: 'h', },

];

@modal
@observer
class ReferModal extends Component {
	state = {
		data: [
			{ id: 1, name: '小云' },
			{ id: 2, name: '小风' },
			{ id: 3, name: '小云' },
			{ id: 4, name: '小风' },
			{ id: 5, name: '小云' },
			{ id: 13, name: '小云' },
			{ id: 24, name: '小风' },
			{ id: 35, name: '小云' },
			{ id: 46, name: '小风' },
			{ id: 51, name: '小云' },
			{ id: 12, name: '小云' },
			{ id: 23, name: '小风' },
			{ id: 34, name: '小云' },
			{ id: 45, name: '小风' },
			{ id: 56, name: '小云' },
		],
		record: {},
	}

	handleSubmit = () => {
		this.props.handleCancel();
	}

	onRowClick = (record) => {
		this.setState({ record });
	}

	render() {
		const { HocModal } = this.props;
		const { data, record } = this.state;

		data.forEach(i => {
			i.items = [
				{ id: 1, a: 'test-100', b: 'dasd', c: '计划完成', d: 100, e: 100, f: 100 },
				{ id: 2, a: 'test-100', b: 'dasd', c: '计划完成', d: 100, e: 100, f: 100 },
				{ id: 3, a: 'test-100', b: 'dasd', c: '计划完成', d: 100, e: 100, f: 100 },
			];
		});

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
							<div className="mt10"><SearchPro onChange={e => console.log(e)} /></div>
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
							dataSource={record.items}
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
		const { RenderCreateTable, BindedFormItem, RenderUpload, handleSubmit, addItems } = this.props;

		return (
			<Container>
				<CreateHearder cb={this.cb} handleSubmit={() => this.props.handleSubmit(this.computedQuery)}>{this.props.name}</CreateHearder>
				<Content style={{ padding: 10 }}>
					<Form>
						<BindedFormItem keyValue="toWarehoseId" />
						<BindedFormItem keyValue="toWarehoseName" />
						<BindedFormItem keyValue="fromWarehoseId" />
						<BindedFormItem keyValue="fromWarehoseName" />
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								{this.props.params.id && <BindedFormItem label="入库单单号" keyValue="sequence">
									<Input style={{ width: 200 }} disabled />
								</BindedFormItem>}
								<BindedFormItem label="到货日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="shipDate"
								>
									<DatePicker allowClear={false} />
								</BindedFormItem>
								<BindedFormItem label="供应商信息" rules={true} keyValue="toWarehouseId">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="仓库信息" rules={true} keyValue="fromWarehouseId">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
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
								<ReferModal><Button type="primary" className="ml20">参照制单</Button></ReferModal>
							</div>)}
					/>
				</Content>
			</Container>
		);
	}
}
