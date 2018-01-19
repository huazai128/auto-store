import React, { Component } from 'react';
import G2 from '@antv/g2';
import DataSet, { DataView } from '@antv/data-set';

import _ from 'lodash';
import dataSource from './data.json';

import { Divider } from 'antd';

const { Global } = G2;
const colorMap = {
	'Asia': Global.colors[0],
	'Americas': Global.colors[1],
	'Europe': Global.colors[2],
	'Oceania': Global.colors[3]
};

export default class extends Component {
	componentDidMount() {
		const chart = new G2.Chart({
			container: this.refs.container,
			forceFit: true,
			height: 400
		});
		chart.source(dataSource, {
			'LifeExpectancy': {
				alias: '人均寿命（年）'
			},
			'Population': {
				type: 'pow',
				alias: '人口总数'
			},
			'GDP': {
				alias: '人均国内生产总值($)',
				tickCount: 10
			},
			'Country': {
				alias: '国家/地区'
			}
		});
		chart.axis('GDP', {
			label: {
				// 格式化坐标轴的显示
				formatter: value => {
					return (value / 1000).toFixed(0) + 'k';
				}
			}
		});
		chart.tooltip({
			showTitle: false // 不显示默认标题
		});

		// chart.legend('Population', false);
		// chart.legend('Country', false);
		// chart.point().position('GDP*LifeExpectancy')
		// 	.size('Population', [4, 65])
		// 	.color('continent')
		// 	.opacity(0.65)
		// 	.shape('circle')
		// 	.tooltip('Country*Population*GDP*LifeExpectancy');
		// chart.render();


		chart.legend('Population', false); // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
		chart.point().position('GDP*LifeExpectancy')
			.size('Population', [4, 65])
			.color('continent', val => {
				return colorMap[val];
			})
			.shape('circle')
			.tooltip('Country*Population*GDP*LifeExpectancy')
			.style('continent', {
				lineWidth: 1,
				strokeOpacity: 1,
				fillOpacity: 0.3,
				opacity: 0.65,
				stroke: val => {
					return colorMap[val];
				}
			});
		chart.render();
	}


	render() {

		return (
			<div>
				<div ref="container"></div>
				<Divider>这是一段分割线</Divider>
				这是一段分割线
			</div>
		);
	}
}
