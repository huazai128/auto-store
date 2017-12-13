import React, { Component } from 'react';

export default WrappedComponent => {
	return class extends React.Component {
		state = {
			tableLoading: false,
			selectedRows: [],
		}



		render() {
			return (
				<WrappedComponent {...this.props} {...this.state} />
			);
		}
	};
};
