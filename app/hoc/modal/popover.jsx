import React, { Component } from 'react';
import { Popover } from 'antd';

export default WrappedComponent => {
	return class extends React.Component {
		state = {
			visible: false,
		}

		hide = () => {
			this.setState({
				visible: false,
			});
		}

		handleVisibleChange = (visible) => {
			this.setState({ visible });
		}

		render() {
			const { title } = this.props;
			return (
				<Popover
					content={<WrappedComponent {...this.state} {...this.props} hide={this.hide} />}
					title={title}
					trigger="click"
					placement="bottomRight"
					visible={this.state.visible}
					onVisibleChange={this.handleVisibleChange}
				>
					{this.props.children}
				</Popover>
			);
		}
	};
};
