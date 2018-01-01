import React, { Component } from 'react';
import { Button, Row, Col as Col_ } from 'antd';

import styles from './Layout.less';

const Col = ({ children, ...rest }) => {
	return (
		<Col_ {...rest}>
			<div className={styles.color1}>
				{children}
			</div>
		</Col_>
	);
};


export default class extends Component {
	render() {
		return (
			<div style={{ margin: 20 }}>
				<h2>layout-demo</h2>
				<Row gutter={8} className={styles.row}>
					<Col push={1} span={6}>1</Col>
					<Col span={6}>1</Col>
					<Col span={6}>1</Col>
					<Col span={6}>1</Col>
				</Row>
			</div>
		);
	}
}
