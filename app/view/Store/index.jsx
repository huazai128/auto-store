import React, { Component } from 'react'
import { Button, Tag, Modal, DatePicker } from 'antd'
import Header from 'components/Header'
import Upload from 'components/Upload'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import DyunFrom from 'components/Form'

import bill from 'hoc/bill'
import modal from 'hoc/modal'

const ButtonGroup = Button.Group

@inject('store')
@modal
@observer
class AddStoreModal extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true)
				await this.props.store.create(values)
				this.props.handleCancel()
			}
		})
	}

	afterClose = () => this.refs.form.resetFields()

	render() {
		// for hoc modal
		const { visible, confirmLoading, handleCancel, HocModal } = this.props

		return (
			<HocModal
				title="添加门店资料"
				onOk={this.handleSubmit}
				afterClose={this.afterClose}
			>
				<DyunFrom ref="form" fields={[...this.props.store.fields]} />
			</HocModal>
		)
	}
}

@inject(stores => ({ store: stores.store }))
@bill
@observer
export default class extends Component {
	store = this.props.store
	componentDidMount() {
		this.store.getData()
	}
	render() {
		const { DeleteButton, HandleButton, ExportGroup, MainTable } = this.props.part

		return (
			<Container>
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<HandleButton method="freeze" state={['created_no', 'created']} icon="lock" >冻结</HandleButton>
							<HandleButton method="unfreeze" state="freeze" icon="unlock" >取消冻结</HandleButton>
						</ButtonGroup>
						<DeleteButton state="created_no" confirm={{ title: '确定删除选中门店？' }}>删除</DeleteButton>
						<AddStoreModal>
							<Button key="Button" className="ml40" type="primary">手动添加门店资料</Button>
						</AddStoreModal>
						<Upload
							columns={this.store.commonColumns}
							handleConfirm={data => { this.store.creates(data) }}
							templetUrl="/static/门店导入.xlsx"
							store={this.store}
						>
							<Button className="ml20" icon="file-excel" type="primary" ghost>Excel导入资料</Button>
						</Upload>
						<ExportGroup />
					</HandleArea>
					<MainTable
						edit
						title={this.props.name}
					/>
				</Content>
			</Container>
		)
	}
}
