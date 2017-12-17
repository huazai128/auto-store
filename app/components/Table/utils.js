import React from 'react';
import { Tooltip } from 'antd';

export function getXSrcoll(columns = []) {
	let x = 0;
	columns.forEach(item => x += item.width);
	return x;
}

export function computeColumns(columns = []) {
	return columns.map(item => {
		return {
			...item,
			dataIndex: item.key,
			className: 'text-overflow',
			render: item.render ? item.render : (text) => {
				return <Tooltip placement="topLeft" title={text}>{text}</Tooltip>;
			}
		};
	});
}
