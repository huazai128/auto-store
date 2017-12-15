import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import SearchSku from 'components/SearchSku';
import Upload from 'components/Upload';
import create from 'hoc/create-table';


@inject(store => ({
	body: store.body,
	prurchase: store.prurchase,
}))
@create({
	url: ''
})
export default class extends Component {
	constructor(props) {
		super(props);
		this.columns = [
			{ width: 100, title: '商品编号', key: 'number' },
			{ width: 100, title: '价格', key: 'count', edit: { type: 'number', min: 0 } },
			{ width: 100, title: '数量', key: 'contdsd', },
		];
	}



	handleSubmit = async () => {
		return await new Promise((resolve, reject) => {
			this.props.form.validateFields(async (err, values) => {
				if (!err) {
					console.log(values);
					setTimeout(() => {
						resolve(values);
					}, 2000);
				} else reject('');
			});
		});
	}

	cb = () => {
		this.props.body.remove(this.props.pathname, this.props.push);
		this.props.prurchase.getData();
	}

	render() {
		const { RenderCreateTable, BindedFormItem } = this.props;

		return (
			<Container>
				<Header asyncBack={{ asyncAction: this.handleSubmit, cb: this.cb }} type="create">{this.props.name}</Header>
				<Content style={{ padding: 10 }}>
					<Form>
						<BindedFormItem keyValue="toWarehoseId" />
						<BindedFormItem keyValue="toWarehoseName" />
						<BindedFormItem keyValue="fromWarehoseId" />
						<BindedFormItem keyValue="fromWarehoseName" />
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								<BindedFormItem label="采购单单号" rules={true} keyValue="a">
									<Input style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="收货店铺编号及名称" rules={true} keyValue="d">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="供货仓库编号及名称" rules={true} keyValue="c">
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</BindedFormItem>
								<BindedFormItem label="采购日期"
									initialValue={moment().startOf('day')}
									rules={true}
									keyValue="b"
								>
									<DatePicker allowClear={false} />
								</BindedFormItem>
							</div>
							<div className="flex-vcenter">
								<BindedFormItem label="备注" keyValue="note">
									<Input style={{ width: 350 }} />
								</BindedFormItem>
							</div>
						</HandleArea>
					</Form>
					<Upload />
					<RenderCreateTable
						title={() => (
							<div>
								<strong>单据明细编辑</strong>
								<SearchSku />
								<Button type="primary" ghost className="ml20">选择添加商品</Button>
								<Button type="primary" onClick={() => this.props.addItems()} ghost className="ml20">Excel导入商品</Button>
							</div>)}
						columns={this.columns}
					/>
				</Content>
			</Container>
		);
	}
}
