/**
 *
 * @create by 2017-11-25
 * @param {any} params
 * @returns
 */

const serializeParams = (params) => {
	return Object.entries(params).map((n, i) => {
		return `${n[0]}=${n[1]}`;
	}).join('&');
};

export const API_HOST = process.env.NODE_ENV == 'production' ? 'http://192.168.0.150:9000' : '192.168.0.209:3721';
export const API_ROOT = API_HOST;

// window.API_ROOT = API_ROOT;

export const callApi = (endpoint, data = null, method = 'GET') => {
	data.access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMxMTAwMTUsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjdmMWFlMDMyLWYxZjQtNGU5OS1hNTc2LTQ4YTQ0M2QwMmVmNyIsImNsaWVudF9pZCI6IlR4eEdqWVpDQVViUWd4aXBLeldadGp2WXVnR0dvUWRWSVlTVVN2QWhxS1dQbFdOeXFkWlNPT0lNVmNVSlFMRnciLCJzY29wZSI6WyJmd2FwaV9iYXNlIl19.J6jCaRYecPTmqeDJDZp8OLfyz55pQetI47a0P7Vapvc';

	let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
	let opt = {
		method: method,
		// credentials: 'include',
		mode: 'cors',
	};
	let headers = new Headers();
	if (data) {
		if (method == 'GET') {
			fullUrl += `?${serializeParams(data)}`;
		} else {
			// headers.append('Content-Type', 'application/json');
			// headers.append('Accept', 'application/json');
			// opt.body = JSON.stringify(data);

			// 大信通POSTt提交方式
			const formData = new FormData();
			formData.append('requestData', JSON.stringify(data));
			opt.body = formData;
		}
	}
	opt.headers = headers;
	return fetch(fullUrl, opt)
		.then(response => response.json())
		.then(response => {
			if (response.code !== 0) {
				return Promise.reject(response);
			} else return Object.assign({}, response);
		});
	// .then(response => response.json()
	// 	.then(json => ({
	// 		json,
	// 		response
	// 	}))).then(({
	// 	json,
	// 	response
	// }) => {
	// 	if (!response.ok) {
	// 		return Promise.reject(json);
	// 	}
	// 	return Object.assign({}, json);
	// });
};

export const getApi = (endpoint, params = {}) => callApi(endpoint, params, 'GET');
export const postApi = (endpoint, params = {}) => callApi(endpoint, params, 'POST');
