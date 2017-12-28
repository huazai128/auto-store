import React from 'react';
import { Tooltip } from 'antd';
import { numeralNumber } from 'utils';
import moment from 'moment';

export function getXSrcoll(columns = []) {
	let x = 0;
	columns.forEach(item => x += item.width);
	return x;
}

export function computeColumns(columns = []) {
	return columns.map(item => {
		if (item.key == 'warehouse') {
			item.render = (_, record) => <div><p>{record.warehouseNumber}</p><p style={{ opacity: 0.67 }}>{record.warehouseName}</p></div>;
		}
		if (item.key == 'supplier') {
			item.render = (_, record) => <div><p>{record.supplierNumber}</p><p style={{ opacity: 0.67 }}>{record.supplierName}</p></div>;
		}

		return {
			width: 100,
			...item,
			dataIndex: item.key,
			className: 'text-overflow',
			render: item.render ? item.render : (text) => {
				// return <Tooltip placement="topLeft" title={text}>{text}</Tooltip>;

				text = numeralNumber(text, item.key);

				if (item.type == 'date') return text && moment(text).format('YYYY.MM.DD');
				if (item.type == 'info') return <p className="primary-6">{text}</p>;
				return text;
			}
		};
	});
}
