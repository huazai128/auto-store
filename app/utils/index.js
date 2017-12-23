import numeral from 'numeral';

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

	if (numeralMap.includes(key)) return numeral(text).format('0,0[.]00');
	else return text;
}
