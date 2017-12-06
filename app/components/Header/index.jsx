import React, { Component } from 'react';
import styles from './style.scss';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

export default class Header extends Component {
	render() {
		const { children, btn } = this.props;
		return (
			<header className={`${styles.header} flex-vcenter jc-between`}>
				<div className="flex-vcenter">
					<h2 className="flex-vcenter">{children}</h2>
					<Button className="ml20" shape="circle" type="primary" icon="reload" />
					{this.props.type == 'create' ?
						<Button className="ml20" type="primary">保存</Button> :
						btn && <Button className="ml20" type="primary"><Link to={btn.to}>{btn.text}</Link></Button>}
				</div>
				{this.props.type !== 'create' && <Search style={{ width: 200 }} placeholder="输入关键字搜索..." />}
			</header>
		);
	}
}
