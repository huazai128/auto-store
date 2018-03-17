import React, { Component } from 'react'
import { Button, Table, Tag, Form, Icon, Input, Modal, DatePicker } from 'antd'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import Upload from 'components/Upload'
import DyunFrom from 'components/Form'

import bill from 'hoc/bill'
import modal from 'hoc/modal'

import { Limit, limitSwitch } from 'components/Limit'

const ButtonGroup = Button.Group

@inject('supplier')
@modal
@observer
class AddStoreModal extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true)
				await this.props.supplier.create(values)
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
				title="添加供应商"
				onOk={this.handleSubmit}
				afterClose={this.afterClose}
			>
				<DyunFrom ref="form" fields={[
					...this.props.supplier.fields
				]} />
			</HocModal>
		)
	}
}


@inject(stores => ({ store: stores.supplier }))
@bill
@observer
export default class extends Component {
	store = this.props.store
	componentDidMount() {
		this.store.init()
	}
	render() {
		const { DeleteButton, HandleButton, ExportGroup, MainTable } = this.props.part
		return (
			<Container>
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<Limit permission="PERMISSION_FROZEN_SUPPLIER"><HandleButton method="freeze" state={['created_no', 'created']} icon="lock">冻结</HandleButton></Limit>
							<Limit permission="PERMISSION_UNFROZEN_SUPPLIER"><HandleButton method="unfreeze" state="freeze" icon="unlock" >取消冻结</HandleButton></Limit>
						</ButtonGroup>
						<Limit permission="PERMISSION_DEL_SUPPLIER"><DeleteButton state="created_no" confirm={{ title: '确定删除选中供应商？' }}>删除</DeleteButton></Limit>
						<Limit permission="PERMISSION_ADD_SUPPLIER">
							<AddStoreModal>
								<Button key="Button" className="ml40" type="primary">手动添加供应商</Button>
							</AddStoreModal>
						</Limit>
						<Limit permission="PERMISSION_ADD_SUPPLIER">
							<Upload
								columns={this.store.commonColumns}
								handleConfirm={data => { this.store.creates(data) }}
								store={this.store}
								templetUrl="/static/供应商.xlsx"
							>
								<Button className="ml20" icon="file-excel" type="primary" ghost>Excel导入资料</Button>
							</Upload>
						</Limit>
						<ExportGroup />
					</HandleArea>
					<MainTable
						edit
						editPermission={!limitSwitch('PERMISSION_UPDATE_SUPPLIER')}
						title={this.props.name}
					/>
				</Content>
			</Container>
		)
	}
}
