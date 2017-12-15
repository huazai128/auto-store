import { Upload, message, Button, Icon, Modal, Tooltip } from 'antd';
import React, { Component } from 'react';
import modal from 'hoc/modal';
import BasicTable from '../Table/basic-table';
import './style.global.scss';
import { filterRepeat } from 'utils';


@modal
export default class extends Component {
	state = { fileList: [] }

	onChange = ({ fileList }) => {
		fileList.forEach(item => {
			if (item.response && item.response.code !== 0) item.status = 'error';
		});

		this.setState({ fileList });
	}

	onPreview = (file) => {
		if (!file.response) return;

		if (file.response.code !== 0) return Modal.error({
			title: '上传文件有误：',
			maskClosable: true,
			content: <div><p>message:</p><pre>{JSON.stringify(file.response, null, 2)}</pre></div>,
		});

		const items = file.response.data.success || [];

		Modal.success({
			maskClosable: true,
			width: 1000,
			title: (
				<div className="flex jc-between">
					<div>导入内容详情</div>
					<Tooltip placement="bottomRight" title="本次导入仅供参考，一切以实物为准~">
						<div className="color-6"><Icon type="question-circle-o" /><span className="fs12 ml5">关于导入</span></div>
					</Tooltip>
				</div>
			),
			content: <BasicTable
				file={file}
				dataSource={items}
				columns={this.props.columns.filter(i => i.key !== 'delete')}
			/>,
			okText: '确定'
		});
	}

	afterClose = () => this.setState({ fileList: [] })

	onOk = () => {
		const successFileList = this.state.fileList.filter(file => file.response && file.response.code == 0);

		const items = successFileList.map(i => i.response.data.success || []);

		let data = [];
		items.forEach(items => {
			data = [...data, ...items];
		});

		this.props.handleConfirm(filterRepeat(data, 'id'));
		this.props.handleCancel();
	}

	render() {
		const uploadProps = {
			name: 'file',
			multiple: true,
			action: 'http://192.168.0.209:3333/api/agents/hq/orders/import?access_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMzNTA0MDQsInVzZXJfbmFtZSI6Inp5dGVzdCIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI0YTU3ZWE4YS1mZTQxLTQwMzYtOTU5My05OTE0ODkwZjUyMjciLCJjbGllbnRfaWQiOiJUeHhHallaQ0FVYlFneGlwS3pXWnRqdll1Z0dHb1FkVklZU1VTdkFocUtXUGxXTnlxZFpTT09JTVZjVUpRTEZ3Iiwic2NvcGUiOlsiZndhcGlfYmFzZSJdfQ.LCUQp9A1-i2ZK-uoF223im1W3KklBXv_Dyrx4FgbJ8E&toWarehouseId=247&typeId=3',
			onPreview: this.onPreview,
			fileList: this.state.fileList,
			onChange: this.onChange
		};

		return (
			<Modal
				title="Excel导入货品资料"
				visible={this.props.visible}
				afterClose={this.afterClose}
				onOk={this.onOk}
				className="upload-modal"
				confirmLoading={this.props.confirmLoading}
				onCancel={() => this.props.handleCancel()}
			>
				<div>
					<Upload {...uploadProps}>
						<div className="ant-upload ant-upload-drag">
							<span className="ant-upload ant-upload-btn">
								<div className="ant-upload-drag-container">
									<p className="ant-upload-drag-icon">
										<Icon type="file-excel" />
									</p>
									<p className="ant-upload-text">选择你需要上传的Excel文件</p>
									<p className="ant-upload-hint">点击文件列表可查看导入明细</p>
								</div>
							</span>
						</div>
					</Upload>
				</div>
				<p className="mt20"><a><Icon type="download" />下载导入模板</a></p>
			</Modal>
		);
	}
}
