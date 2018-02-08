import React from 'react'
import { Tooltip } from 'antd'
import { formatValue } from 'utils'
import moment from 'moment'

const TwoRow = ({ text, secondary }) => (
	<div>
		<p>{text}</p>
		<p style={{ opacity: 0.67 }}>{secondary}</p>
	</div>
)

export function getXSrcoll(columns = []) {
	return columns.map(item => item.width).reduce((a, b) => a + b, 0)
}

export function computeColumns(columns = []) {
	return columns.map(item => {
		analyzeKey(item)

		return {
			width: 100,
			...item,
			dataIndex: item.key,
			className: 'text-overflow',
			render: item.render ? item.render : (text) => {
				text = formatValue(text, item.key)
				if (item.type == 'info') return <p className="info-color">{text}</p>
				return text;
				// return <Tooltip placement="top" title={text}>{text}</Tooltip>
			}
		}
	})
}

export function analyzeKey(item = {}) {
	const twoRowMap = [
		'warehouse',
		'supplier',
		'toWarehouse',
		'fromWarehouse',
		'store',
	]
	if (twoRowMap.includes(item.key)) item.render = (_, record) => <TwoRow text={record[`${item.key}Number`]} secondary={record[`${item.key}Name`]} />
}
