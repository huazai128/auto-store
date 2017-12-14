import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.209:3721';
axios.defaults.timeout = 2000;
axios.defaults.params = {
	access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMyNjE1MjQsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjNmZGZmODJlLWZjZGQtNDA3My1iZjIwLWUwY2RiNmU2NmY3MSIsImNsaWVudF9pZCI6IlR4eEdqWVpDQVViUWd4aXBLeldadGp2WXVnR0dvUWRWSVlTVVN2QWhxS1dQbFdOeXFkWlNPT0lNVmNVSlFMRnciLCJzY29wZSI6WyJmd2FwaV9iYXNlIl19.KXT3pRoMGN4ws9Use3ZLzeeU_YWYjMrKF8kaMGy3W38'
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

