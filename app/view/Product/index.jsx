import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import popover from 'hoc/popover'
import ModalAdd from './ModalAdd'
import Upload from 'components/Upload'
import bill from 'hoc/bill'

import { Limit } from 'components/Limit'

const ButtonGroup = Button.Group

@inject(stores => ({ store: stores.product }))
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
							<Limit permission="PERMISSION_INVOKE_SKU"><HandleButton method="invoke" state="created" icon="check-circle-o">应用</HandleButton></Limit>
							<Limit permission="PERMISSION_UNINVOKE_SKU"><HandleButton method="uninvoke" state="invoked_no" icon="close-circle-o">反应用</HandleButton></Limit>
						</ButtonGroup>
						<Limit permission="PERMISSION_DEL_ATTR"><DeleteButton confirm={{ title: '确定要删除选中货品？' }}>删除</DeleteButton></Limit>
						<Limit permission="PERMISSION_ADD_ATTR">
							<ModalAdd title="添加货品资料">
								<Button className="ml40" type="primary">手动添加货品</Button>
							</ModalAdd>
						</Limit>
						<Limit permission="PERMISSION_ADD_ATTR">
							<Upload
								columns={this.store.commonColumns}
								handleConfirm={data => { this.store.creates(data) }}
								store={this.store}
								templetUrl="/static/商品.xlsx"
							>
								<Button className="ml20" icon="file-excel" type="primary" ghost>Excel导入资料</Button>
							</Upload>
						</Limit>
						<ExportGroup />
						{/* <ConfirmPopover title="综合筛选">
							<Button className="ml20" icon="filter" type="primary">综合筛选</Button>
						</ConfirmPopover> */}
					</HandleArea>
					<MainTable edit title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
