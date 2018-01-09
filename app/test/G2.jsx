import React, { Component } from 'react';
import G2 from '@antv/g2';
import DataSet, { DataView } from '@antv/data-set';

import _ from 'lodash';

const data = [
	{ month: 'Jan' },
	{ month: 'Feb' },
	{ month: 'Mar' },
	{ month: 'Apr' },
	{ month: 'May' },
	{ month: 'Jun' },
	{ month: 'Jul' },
	{ month: 'Aug' },
	{ month: 'Sep' },
	{ month: 'Oct' },
	{ month: 'Nov' },
	{ month: 'Dec' }
];

data.forEach(item => {
	item.beijing = _.random(-10, 10);
	item.London = _.random(-10, 38);
	item.Tokyo = _.random(-10, 38);
});

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
	type: 'fold',
	fields: ['beijing', 'Tokyo', 'London'], // 展开字段集
	key: 'city', // key字段
	value: 'temperature', // value字段
});

export default class extends Component {
	componentDidMount() {
		const chart = new G2.Chart({
			container: this.refs.container,
			forceFit: true,
			height: 600
		});

		this.chart = chart;

		chart.source(dv, {
			month: {
				range: [0, 1]
			}
		});
		chart.tooltip({
			crosshairs: {
				type: 'line'
			}
		});
		chart.axis('temperature', {
			label: {
				formatter: val => {
					return val + '°C';
				}
			}
		});
		chart.line().position('month*temperature').color('city').shape('smooth');
		chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
			stroke: '#fff',
			lineWidth: 1
		});
		chart.render();
	}

	onClick = () => {
		console.log(this.chart);
		this.chart.render();
	}

	render() {
		console.log(123);

		return (
			<div>
				<div ref="container"></div>
				<button onClick={this.onClick}>按钮</button>
			</div>
		);
	}
}
