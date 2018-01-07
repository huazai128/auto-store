import React, { Component } from 'react';
import { Button, Row, Col, Layout, Alert } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import styles from './Layout.less';

// const Col = ({ children, ...rest }) => {
// 	return (
// 		<Col_ {...rest}>
// 			<div className={styles.color1}>
// 				{children}
// 			</div>
// 		</Col_>
// 	);
// };


export default class extends Component {
	render() {
		return (
			<div style={{ margin: 20 }}>
				<h1>layout-demo</h1>
				<h2>layout-demo</h2>
				<h3>layout-demo</h3>
				<h4>layout-demo</h4>
				<h5>layout-demo</h5>
				<h6>layout-demo</h6>

				<Row className={styles.row} gutter={8}>
					<Col span={8}>
						<Row style={{ height: '100%' }} type="flex" justify="center" align="middle">
							asdasd
						</Row>
					</Col>
					<Col span={8}>123</Col>
					<Col span={8}>13</Col>
				</Row>

				<Row gutter={8}>
					<Col sm={12} xs={24}>
						<Alert
							message="这是一段文字"
							description="地方南京师范的好快斯柯达解放后开始对话框打算接口的好快喝咖啡对话框."
							type="success"
							showIcon
						/>
					</Col>
					<Col sm={12} xs={0}>
						<Alert
							message="Informational Notes"
							description="Additional description and informations about copywriting."
							type="info"
							showIcon
						/>
					</Col>
					{/* <Col xl={6} span={0}>
						<Alert
							message="Error"
							description="Additional description and informations about copywriting."
							type="error"
							showIcon
						/>
					</Col>
					<Col xl={6} span={0}>
						<Alert
							message="Error"
							description="Additional description and informations about copywriting."
							type="warning"
							showIcon
						/>
					</Col> */}
				</Row>
			</div>
		);
	}
}
