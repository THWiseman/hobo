import axios from 'axios'
const api = axios.create({withCredentials : true});

const API_URL = 'http://localhost:4000/api/steamcollector';

export const signup = async (user) => {
    const response = await api.post(API_URL + '/signup', user);
    return response.data
}

export const login = async (email,password) => {
    const response = await api.post(API_URL + '/login', {email: email, password: password});
    return response.data
}

export const logout = async (user) => {
    const response = await api.post(API_URL + '/logout');
    return response.data
}

export const getUserById = async (id) => {
    const respone = await (api.get(API_URL+'/getUser/' + id));
}

export const profile = async () => {
    const response = await api.post(API_URL + '/profile');
    return response.data
}
