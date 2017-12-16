import React from 'react';
import axios from 'axios';
import { Modal } from 'antd';

axios.defaults.baseURL = 'http://192.168.0.133:3721';
axios.defaults.timeout = 3000;
axios.defaults.params = {
	access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM0Mzc4NTksInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsiZndhcGlfYmFzZSJdLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiYjY4YmJhM2ItYjVkMS00NGYzLTg3YmItYmQzMmZmNjk0MGUzIiwiY2xpZW50X2lkIjoiVHh4R2pZWkNBVWJRZ3hpcEt6V1p0anZZdWdHR29RZFZJWVNVU3ZBaHFLV1BsV055cWRaU09PSU1WY1VKUUxGdyJ9.-SxxKmXYs0w_hPPOfAwGodIdt0gDfkkCETe7qbdxxvo'
};

export const showError = (error) => {
	return Modal.error({
		title: '操作错误',
		content: <div><p>message:</p><pre>{JSON.stringify(error, null, 2)}</pre></div>
	});
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
			const { data } = res;
			if (data.code !== 0) {
				reject(showError(data));
			}
			resolve(data);
		}).catch(error => {
			reject(showError(error));
		});
	});
};

export const post = (url, params) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			data: params,
		}).then(res => {
			const { data } = res;
			if (data.code !== 0) {
				reject(showError(data));
			}
			resolve(data);
		}).catch(error => reject(showError(error)));
	});
};

export const postByParam = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			params,
		}).then(res => {
			const { data } = res;
			if (data.code !== 0) {
				reject(showError(data));
			}
			resolve(data);
		}).catch(error => reject(showError(error)));
	});
};

export const filterRepeat = (arr, key) => {
	return [...new Set(arr.map(item => item[key]))].map(value => arr.find(item => item[key] === value));
};
