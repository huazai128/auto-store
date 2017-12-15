import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.209:3721';
axios.defaults.timeout = 2000;
axios.defaults.params = {
	access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMzNDY4MDYsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImJjMTlmYmFhLWNiNmItNDVhMy1iOTFiLWE1Mzk1MWQ4YTY4YSIsImNsaWVudF9pZCI6IlR4eEdqWVpDQVViUWd4aXBLeldadGp2WXVnR0dvUWRWSVlTVVN2QWhxS1dQbFdOeXFkWlNPT0lNVmNVSlFMRnciLCJzY29wZSI6WyJmd2FwaV9iYXNlIl19.m2juGcR9OfAUh1pHOiBNmOH8UIPBzCZguYk-EoP0yhQ'
};

export const get = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url,
			params,
			// cancelToken: new CancelToken(c => {
			// 	cancel = c
			// })
		}).then(res => {
			resolve(res.data);
		}).catch(error => reject(error));
	});
};

export const post = (url, params) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			data: params,
		}).then(res => {
			resolve(res.data);
		}).catch(error => reject(error));
	});
};

export const postByParam = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			params,
		}).then(res => {
			resolve(res.data);
		}).catch(error => reject(error));
	});
};

export const filterRepeat = (arr, key) => {
	return [...new Set(arr.map(item => item[key]))].map(value => arr.find(item => item[key] === value));
};
