import { Upload, message, Button, Icon, Modal, Tooltip } from 'antd';
import React, { Component } from 'react';
import modal from 'hoc/modal';
import UploadTable from './UploadTable';
import styles from './style.less';
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
			content: <UploadTable
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
			action: 'http://192.168.0.222:3333/api/orders/import?access_token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM4ODE1MDUsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsiZndhcGlfYmFzZSJdLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMDQ5NDQzYTUtMzVjNC00YzJlLTgyMWEtZTgxNDMyMTYwNmU0IiwiY2xpZW50X2lkIjoiVHh4R2pZWkNBVWJRZ3hpcEt6V1p0anZZdWdHR29RZFZJWVNVU3ZBaHFLV1BsV055cWRaU09PSU1WY1VKUUxGdyJ9.jiRPEXTx3V_DLKbDSAH33v8KaoBj6fHVYzfA3r5Pwqk&warehouseId=201&typeId=2',
			onPreview: this.onPreview,
			fileList: this.state.fileList,
			onChange: this.onChange
		};

		return (
			<Modal
				title="Excel导入资料"
				visible={this.props.visible}
				afterClose={this.afterClose}
				onOk={this.onOk}
				className={styles.upload}
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
