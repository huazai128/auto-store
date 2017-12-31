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
				<Row type="flex" justify="space-between" className={styles.row}>
					<Col span={1}>1</Col>
					<Col span={1}>
						<Button>dfsdf</Button>
					</Col>
				</Row>
			</div>
		);
	}
}
