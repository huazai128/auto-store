import 'ant-design-pro/dist/ant-design-pro.css';
import React, { Component } from 'react';
import { yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import { Row, Col, Icon, Tooltip } from 'antd';
import numeral from 'numeral';

export default class extends Component {
	render() {
		return (
			null
			// <Row>
			// 	<Col span={24}>
			// 		<ChartCard
			// 			title="销售额"
			// 			action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
			// 			footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
			// 			contentHeight={46}
			// 		>
			// 			<span>
			// 				周同比
			// 				<Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
			// 			</span>
			// 			<span style={{ marginLeft: 16 }}>
			// 				日环比
			// 				<Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
			// 			</span>
			// 		</ChartCard>
			// 	</Col>
			// 	<Col span={24} style={{ marginTop: 24 }}>
			// 		<ChartCard
			// 			title="移动指标"
			// 			avatar={
			// 				<img
			// 					style={{ width: 56, height: 56 }}
			// 					src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
			// 					alt="indicator"
			// 				/>
			// 			}
			// 			action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
			// 			footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
			// 		/>
			// 	</Col>
			// 	<Col span={24} style={{ marginTop: 24 }}>
			// 		<ChartCard
			// 			title="移动指标"
			// 			avatar={(
			// 				<img
			// 					alt="indicator"
			// 					style={{ width: 56, height: 56 }}
			// 					src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
			// 				/>
			// 			)}
			// 			action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
			// 		/>
			// 	</Col>
			// </Row>
		);
	}
}
