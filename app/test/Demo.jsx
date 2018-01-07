import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import modal from 'hoc/modal';

class App extends React.Component {
	state = {
		visible: false,
		confirmLoading: false,
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleOk = (e) => {
		this.setState({
			confirmLoading: true
		});

		setTimeout(() => {
			this.setState({
				visible: false,
				confirmLoading: false
			});
		}, 3000);
	}

	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}

	render() {
		return (
			<div style={{ margin: 50 }}>
				<Button type="primary" onClick={this.showModal}>Open</Button>
				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					confirmLoading={this.state.confirmLoading}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
			</div>
		);
	}
}

@modal
class Demo extends Component {
	render() {
		const { HocModal } = this.props;

		return (
			<HocModal>
				damao
			</HocModal>
		);
	}
}

export default () => (
	<Demo>
		<Button type="primary" onClick={this.showModal}>Open</Button>
	</Demo>
);
