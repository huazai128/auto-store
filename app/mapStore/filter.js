export const stateFilters = {
	filterMultiple: false,
	filters: [
		{ text: '未审核', value: 'created', },
		{ text: '已审核', value: 'checked', },
		{ text: '已登账', value: 'confirmed', }
	]
};

export const productStateFilters = {
	filterMultiple: false,
	filters: [
		{ text: '未应用', value: 1, },
		{ text: '已应用(未生效)', value: 2, },
		{ text: '已应用', value: 3, }
	]
};
