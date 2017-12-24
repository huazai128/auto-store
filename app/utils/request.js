import React from 'react';
import axios from 'axios';
import { Modal } from 'antd';

const codeMessage = {
	// 200: '服务器成功返回请求的数据',
	// 201: '新建或修改数据成功。',
	// 202: '一个请求已经进入后台排队（异步任务）',
	// 204: '删除数据成功。',
	400: '错误请求,请求参数有误!',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '请求错误,未找到该资源',
	405: '请求方法未允许',
	406: '请求的格式不可得。',
	408: '请求超时',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器',
	502: '网关错误',
	501: '网络未实现',
	503: '服务不可用，服务器暂时过载或维护',
	504: '网关超时',
	505: 'http版本不支持该请求'
};

const showError = (error) => {
	// return error;
	return Modal.error({
		title: '操作错误',
		content: <div><p>message:</p><pre>{JSON.stringify(error, null, 2)}</pre></div>
		// content: error
	});
};

axios.defaults.baseURL = 'http://192.168.0.133:3721';
axios.defaults.timeout = 5000;
axios.defaults.params = {
	access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTQxMjUzNzEsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsiZndhcGlfYmFzZSJdLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOTkwYWE5NGItOWVlYi00MDFjLTg3YjUtZmI3ZjUwNmJmNTIwIiwiY2xpZW50X2lkIjoiVHh4R2pZWkNBVWJRZ3hpcEt6V1p0anZZdWdHR29RZFZJWVNVU3ZBaHFLV1BsV055cWRaU09PSU1WY1VKUUxGdyJ9.-PvLPVknwibOS7roh2yDTSdRT_0K9GCPL5A49Xuo5Ss'
};

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error && error.response) {
			error.message = codeMessage[error.response.status] || `连接错误${error.response.status}`;
		} else {
			error.message = '连接到服务器失败';
		}
		// showError(error.message);
		return Promise.reject(error.message);
	}
);


export const get = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url,
			params,
		}).then(res => {
			const { data } = res;
			// if (data.code !== 0) {
			// 	reject(showError(data));
			// }
			resolve(data);
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
			const { data } = res;
			resolve(data);
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
			const { data } = res;
			if (data.code !== 0) {
				reject(showError(data));
			}
			resolve(data);
		}).catch(error => reject(error));
	});
};
