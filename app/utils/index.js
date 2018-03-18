import numeral from 'numeral'
import moment from 'moment'

// 数组通过对象属性去重
export const filterRepeat = (arr, key) => {
	return [...new Set(arr.map(item => item[key]))].map(value => arr.find(item => item[key] === value))
}

export function formatValue(text, key = '') {
	const numeralMap = [
		'totalCostPrice',
		'totalPrice',
		'price',
		'costPrice',
		'amount',
		'totalAmount',
		'availableAmount',
		'totalAvailableAmount',
		'totalCostPriceDiff',
		'totalPriceDiff',
		'totalAmountDiff',
	]

	const dateMap = [
		'createdDate',
		'checkedDate',
		'confirmedDate',
		'purchaseDate',
		'arrivalDate',
		'shipDate',
		'openDate',
		'stocktakingDate',
	]



	if (numeralMap.includes(key)) return numeral(text).format('0,0[.]00')
	if (dateMap.includes(key)) return text && moment(text).format('YYYY.MM.DD')
	else return text
}


export function serializeParams(params) {
	return Object.entries(params).map((n, i) => {
		return `${n[0]}=${n[1]}`
	}).join('&')
}


export function translateParams(values) {
	Object.keys(values).forEach((key) => {
		// 处理moment对象 ==>	dateValoe
		if (moment.isMoment(values[key])) values[key] = moment(values[key]).startOf('day').valueOf()

		// 数组逗号隔开
		if (Array.isArray(values[key]) && values[key].length == 0) {
			delete values[key]
		} else if (Array.isArray(values[key])) values[key] = values[key].toString()
	})
}


export function filterBlank(value) {
	if (value instanceof String) return new Error('value is not string')

	return value.replace(/\s/g, '')
}
