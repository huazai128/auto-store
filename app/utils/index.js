import numeral from 'numeral';
import moment from 'moment';
export const filterRepeat = (arr, key) => {
	return [...new Set(arr.map(item => item[key]))].map(value => arr.find(item => item[key] === value));
};


export function numeralNumber(text, key = '') {
	const numeralMap = [
		'totalCostPrice',
		'totalPrice',
		'price',
		'costPrice',
		'amount',
	];

	const dateMap = [
		'openDate'
	];

	if (numeralMap.includes(key)) return numeral(text).format('0,0[.]00');
	if (dateMap.includes(key)) return text && moment(text).format('YYYY.MM.DD');
	else return text;
}
