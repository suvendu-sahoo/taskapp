import axios from 'axios';

import AuthService from './Auth';

const API_URL = process.env.REACT_APP_API_URL + 'task/';

const list = () => {
    return axios.get(API_URL, { headers: AuthService.getAuthHeader() });
};

const create = (request) => {
    return axios.post(API_URL, request, { headers: AuthService.getAuthHeader() });
};

const update = (_id, request) => {
    return axios.put(API_URL + _id, request, { headers: AuthService.getAuthHeader() });
};

const updateStatus = (_id) => {
    return axios.put(API_URL + _id + '/status', {}, { headers: AuthService.getAuthHeader() });
};

const destroy = (_id) => {
    return axios.delete(API_URL + _id, { headers: AuthService.getAuthHeader() });
};

export default { list, create, update, updateStatus, destroy };