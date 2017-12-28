
hoc modal

HocModal: {
	onCancel, // 取消的事件， 因为没什么用，所以直接抽出来了
	confirmLoading, // onConfirmLoading = (boolean) => this.setState({ confirmLoading: boolean, }); 控制按钮是否旋转
	visible // 显示后者隐藏
}

````jsx
import React, { Component } from 'react';
import modal from 'hoc/modal';


@modal
class C extends Component {
	render() {
		const { HocModal, onConfirmLoading, title } = this.props;

		return (
			<HocModal onOk={() => { /* some...event */ }}>
				{/* content... <div></div> */}
			</HocModal>
		);
	}
}


