import React, { Component } from 'react';
import styles from './style.scss';
import { Button, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const { Search } = Input;


@observer
export default class Header extends Component {
	static defaultProps = {
		store: {
			getData: () => { console.log('onSearch'); }
		},
	}

	state = {
		loading: false,
	}

	render() {
		const { children, btn } = this.props;
		const { loading } = this.state;
		return (
			<header className={`${styles.header} flex-vcenter jc-between`}>
				<div className="flex-vcenter">
					<h2 className="flex-vcenter">{children}</h2>
					<Button onClick={() => this.props.store.getData()} className="ml20" shape="circle" type="primary" icon="reload" />
					{btn && <Button className="ml20" type="primary"><Link to={btn.to}>{btn.text || '保存'}</Link></Button>}
				</div>
				<Search
					style={{ width: 200 }}
					onChange={e => this.props.store.handleSearchChange(e.target.value)}
					placeholder="输入关键字搜索..."
				/>
			</header>
		);
	}
}
