// post / api / stocktakings / diff / generate

const obj = {
	'warehouseId': 1,
	'global': true,
	'stocktakingDate': 1517543097304,
	'items': [
		{ 'skuId': 12, 'amount': 10 },
		{ 'skuId': 22, 'amount': 10 },
		{ 'skuId': 9, 'amount': 10 },
		{ 'skuId': 19, 'amount': 10 }
	]
}

// get / api / stocktakings / diff
// param diffId, from, size

// post / api / stocktakings / diff / update
// param id, note

// --------------
// 	post / api / stocktakings / create
// {
// 	"warehouseId": 1,
// 		"stocktakingDate": 1517543097304,
// 			"diffId": 166316154846448,
// 				"global": true,
// 					"note": "hahaha~~",
// 						"items": [
// 							{ "skuId": 12, "amount": 10 },
// 							{ "skuId": 22, "amount": 10 },
// 							{ "skuId": 9, "amount": 10 },
// 							{ "skuId": 19, "amount": 10 }
// 						]
// },

// // post / api / stocktakings / update ? id =
// {
// 	"warehouseId": 1,
// 		"stocktakingDate": 1517543097304,
// 			"diffId": 166316154846448,
// 				"global": true,
// 					"note": "hahaha~~",
// 						"items": [
// 							{ "skuId": 12, "amount": 20 },
// 							{ "skuId": 22, "amount": 20 },
// 							{ "skuId": 9, "amount": 20 },
// 							{ "skuId": 19, "amount": 20 }
// 						]
// }

// post / api / stocktakings / update / note ? id =& note=

// 		post / api / stocktakings / update / item / note ? id =& itemId=& note=

// post / api / stocktakings / [check / uncheck / confirm, unconfirm / delete] ? ids

