import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.209:3721';
axios.defaults.timeout = 5000;
axios.defaults.params = {
	access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMxNzM0MjAsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImU4M2M3MTIxLTc5YmMtNDgyYy1iYjFkLTlhZDhkNjQ3NDcyNSIsImNsaWVudF9pZCI6IlR4eEdqWVpDQVViUWd4aXBLeldadGp2WXVnR0dvUWRWSVlTVVN2QWhxS1dQbFdOeXFkWlNPT0lNVmNVSlFMRnciLCJzY29wZSI6WyJmd2FwaV9iYXNlIl19.mTafRUL5Am48hHWXcdGzsib-oZbnZqgM-6sXpvDzXfI'
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

