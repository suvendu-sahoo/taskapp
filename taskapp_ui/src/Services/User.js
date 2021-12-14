import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + 'user/';

const register = (request) => {
	return axios.post(API_URL + 'register', request);
};

const login = (request) => {
	return axios.post(API_URL + 'login', request);
};

const logout = () => {
	localStorage.removeItem('user');
};

const getAuthUser = () => {
	return JSON.parse(localStorage.getItem('user'));
};

export default { register, login, logout, getAuthUser };