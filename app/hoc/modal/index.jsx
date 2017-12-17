import React, { Component } from 'react';
import { Modal } from 'antd';

export default WrappedComponent => {
	return class extends React.Component {
		constructor(props) {
			super(props);

			/* onCancel, confirmLoading, visible */
			this.HocModal = ({ children, ...reset }) => React.cloneElement(<Modal>{children}</Modal>, {
				onCancel: () => this.handleCancel(),
				confirmLoading: this.state.confirmLoading,
				visible: this.state.visible,
				...reset
			});

		}

		state = {
			visible: this.props.visible || false,
			confirmLoading: false,
		}

		showModal = () => this.setState({ visible: true, });

		componentWillReceiveProps(nextProps) {
			const { visible } = nextProps;
			this.setState({ visible });
		}

		onConfirmLoading = (boolean) => this.setState({ confirmLoading: boolean, });

		handleCancel = (cb = () => { }) => {
			this.setState({
				visible: false,
				confirmLoading: false,
			}, cb);
		}

		render() {

			return (
				[
					React.cloneElement(this.props.children, { onClick: this.showModal, key: 'outer' }),
					<WrappedComponent
						key="WrappedComponent"
						HocModal={this.HocModal}
						onConfirmLoading={this.onConfirmLoading}
						handleCancel={this.handleCancel}
						{...this.state}
						{...this.props}
					/>
				]
			);
		}
	};
};
