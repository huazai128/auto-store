export const stateFilters = {
	filterMultiple: false,
	filters: [
		{ text: '未审核', value: 'created', },
		{ text: '已审核', value: 'checked', },
		{ text: '已登账', value: 'confirmed', }
	]
}

export const productStateFilters = {
	filterMultiple: false,
	filters: [
		{ text: '未应用', value: 'created', },
		{ text: '已应用(未生效)', value: 'invoked_no', },
		{ text: '已应用', value: 'invoked', }
	]
}

export const dataStateFilters = {
	filterMultiple: false,
	filters: [
		{ text: '合作中', value: 'created_no', },
		{ text: '合作中(未产生单据)', value: 'created', },
		{ text: '已冻结', value: 'freeze', }
	]
}
