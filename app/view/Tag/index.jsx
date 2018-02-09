import React, { Component } from 'react'
import { Button, Modal, List, Icon, Popconfirm, Tag, message } from 'antd'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import modal from 'hoc/modal'
import CustomFrom from 'components/Form'
import BasicTable from 'components/Table/Basic'
import styles from './style.less'

import NoticeIcon from 'pro/NoticeIcon'
import moment from 'moment'

@modal
@inject('tag')
@observer
class AddModal extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				if (this.props.id) values.parentId = this.props.id
				this.props.onConfirmLoading(true)
				try {
					await this.props.tag.create(values)
					message.success('操作成功')
					this.props.handleCancel()
				} catch (error) {
					this.props.handleCancel()
					message.warning('操作失败~!')
				}
			}
		})
	}

	afterClose = () => this.refs.form.resetFields();

	render() {
		const { HocModal, fields } = this.props
		return (
			<HocModal
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
			>
				<CustomFrom ref="form" fields={fields} />
			</HocModal>
		)
	}
}

@inject('tag')
@observer
export default class extends Component {
	store = this.props.tag
	render() {
		const { dataSource, columns } = this.store
		columns.forEach(item => {
			if (item.key == 'action') item.render = (_, { id, name }) => {
				return (
					<div>
						<AddModal fields={[{ label: '小类名称', key: 'name', rules: { required: true, } }]} title={<div>为<a style={{ margin: '0 4px' }}>{name}</a>添加子属性</div>} id={id}>
							<a><Icon style={{ fontSize: 14, marginRight: 5 }} type="tag-o" />添加子属性</a>
						</AddModal>
						<Popconfirm placement="top" title="确定要删除？" onConfirm={() => this.props.tag.handle('delete', [id])}>
							<span className="ml20 error-color pointer">删除</span>
						</Popconfirm>
					</div>
				)
			}
		})
		return (
			<Container>
				<Header noSearch store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<AddModal fields={[{ label: '大类名称', key: 'name', rules: { required: true, } }]} title="添加属性">
							<Button type="primary" ghost>手动添加属性</Button>
						</AddModal>
					</HandleArea>
					<BasicTable
						dataSource={dataSource}
						columns={columns}
						scroll={{ y: 600 }}
						loading={this.store.tableLoading}
						pagination={false}
						expandedRowRender={record => (
							<div className={styles.listWrap}>
								<List
									itemLayout="horizontal"
									dataSource={record.items}
									size="small"
									renderItem={item => (
										<List.Item actions={[
											<Popconfirm placement="top" title="确定要删除？" onConfirm={() => this.props.tag.handle('delete', [item.id])}>
												<span className="error-color">删除</span>
											</Popconfirm>
										]} title={item.name}>
											<List.Item.Meta title={item.name} />
											<div />
										</List.Item>
									)}
								/>
							</div>
						)}
					/>
				</Content>
			</Container>
		)
	}
}


