import React, { Component } from 'react';

export default WrappedComponent => {
	return class extends React.Component {
		state = {
			visible: false,
			confirmLoading: false,
		}

		showModal = () => this.setState({ visible: true, });

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
						onConfirmLoading={this.onConfirmLoading}
						showModal={this.showModal}
						handleCancel={this.handleCancel}
						{...this.state}
						{...this.props}
					/>
				]
			);
		}
	};
};
