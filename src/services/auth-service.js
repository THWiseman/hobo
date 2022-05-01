import axios from 'axios'
const api = axios.create({withCredentials : true});

//const API_URL_AUTH = 'http://localhost:4000/api/steamcollector';
const REACT_APP_API_URL_AUTH = process.env.REACT_APP_API_URL_AUTH;

export const signup = async (user) => {
    const response = await api.post(REACT_APP_API_URL_AUTH + '/signup', user);
    return response.data
}

export const updateUserPersonalInfo = async(user) => {
    const response = await api.post(REACT_APP_API_URL_AUTH + '/user', user);
    return response.data;
}

export const followCurator = async (follower, followedCurator) => {
    const body = {
        follower : follower,
        followedCurator : followedCurator
    }
    const userFollowing = await api.put(REACT_APP_API_URL_AUTH + '/follow',  body);
    return userFollowing.data;
}

export const login = async (email,password) => {
    const response = await api.post(REACT_APP_API_URL_AUTH + '/login', {email: email, password: password});
    return response.data
}

export const logout = async (user) => {
    const response = await api.post(REACT_APP_API_URL_AUTH + '/logout');
    return response.data
}

export const getUserById = async (id) => {
    const axiosResponse = await (api.get(REACT_APP_API_URL_AUTH+'/getUser/' + id));
    return axiosResponse.data;
}

export const profile = async () => {
    const response = await api.post(REACT_APP_API_URL_AUTH + '/profile');
    return response.data
}

export const getAllCurators = async () => {
    const response = await (api.get(REACT_APP_API_URL_AUTH + '/curators'));
    return response.data;
}

export const getCollectionsForUser = async (userId) => {
    const response = await (api.get(REACT_APP_API_URL_AUTH + '/collections' + userId));
    return response.data;
}

export const getAllCollections = async () => {
    const response = await (api.get(REACT_APP_API_URL_AUTH + '/collections'));
    return response.data;
}