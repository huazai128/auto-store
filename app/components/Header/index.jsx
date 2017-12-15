import React, { Component } from 'react';
import styles from './style.scss';
import { Button, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const { Search } = Input;


@observer
export default class Header extends Component {
	static defaultProps = {
		update: () => { },
		store: {
			getData: () => { console.log('onSearch'); }
		},
	}

	state = {
		loading: false,
	}

	render() {
		const { children, btn, update, handleSubmit } = this.props;

		const { loading } = this.state;
		return (
			<header className={`${styles.header} flex-vcenter jc-between`}>
				<div className="flex-vcenter">
					<h2 className="flex-vcenter">{children}</h2>
					{this.props.type !== 'create' ?
						<Button onClick={() => this.props.store.getData()} className="ml20" shape="circle" type="primary" icon="reload" /> :
						<Button onClick={() => this.props.handleSubmit()} className="ml20" type="primary">保存</Button>}
					{btn && <Button className="ml20" type="primary"><Link to={btn.to}>{btn.text || '保存'}</Link></Button>}
					{/* {
						asyncBack &&
						<Button
							className="ml20"
							loading={loading}
							onClick={async () => {
								this.setState({ loading: true });
								try {
									await this.props.asyncBack.asyncAction();
									this.setState({ loading: false }, () => {
										Modal.success({
											title: '操作成功',
											onOk: asyncBack.cb
										});
									});
								} catch (error) {
									this.setState({ loading: false });
								}
							}}
							type="primary">
							保存
						</Button>
					} */}
				</div>
				{this.props.type !== 'create'
					&&
					<Search
						style={{ width: 200 }}
						onSearch={value => this.props.store.handleSearch(value)}
						placeholder="输入关键字搜索..."
					/>}
			</header>
		);
	}
}
