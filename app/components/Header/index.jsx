import React, { Component } from 'react';
import styles from './style.scss';

export default class Header extends Component {
	render() {
		const { children } = this.props;
		return (
			<header className={`${styles.header} flex-vcenter`}>
				<h2 className="flex-vcenter">{children}</h2>
			</header>
		);
	}
}
