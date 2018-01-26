import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import popover from 'hoc/popover'
import ModalAdd from './ModalAdd'
import Upload from 'components/Upload'

const ButtonGroup = Button.Group

@popover({
	confirm: true
	})
class ConfirmPopover extends Component {
	render() {
		return (
			<div>content</div>
		)
	}
}

@inject('product')
@observer
export default class extends Component {
	store = this.props.product
	componentDidMount() {
		this.store.init()
	}

	render() {
		const { HandleButton, RenderWarehousePopover } = this.store

		return (
			<Container>
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<HandleButton method="invoke" state="created" icon="check-circle-o">应用</HandleButton>
							<HandleButton method="uninvoke" state="invoked_no" icon="close-circle-o">反应用</HandleButton>
						</ButtonGroup>
						<HandleButton
							method="delete"
							style={{ marginLeft: 20 }}
							type="danger"
							state="created"
							confirm={{ title: '确定要删除选中货品？' }}
						>
							删除
						</HandleButton>
						<ModalAdd title="添加货品资料">
							<Button className="ml40" type="primary">手动添加货品</Button>
						</ModalAdd>
						<Upload handleConfirm={() => { }}><Button className="ml20" icon="file-excel" type="primary" ghost>Excel导入资料</Button></Upload>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
						<ConfirmPopover title="综合筛选">
							<Button className="ml20" icon="filter" type="primary">综合筛选</Button>
						</ConfirmPopover>
					</HandleArea>
					<this.store.RenderMainTable edit title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
