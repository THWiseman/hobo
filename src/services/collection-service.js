import axios from 'axios'
const api = axios.create({withCredentials : true});

//const API_URL = 'http://localhost:4000/api/steamcollector';
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const getAllCollections = async() => {
    const response = await(api.get(REACT_APP_API_URL + '/collections'));
    return response.data;
}

export const getCollectionsMadeByUser = async(userId) => {
    const response = await(api.get(REACT_APP_API_URL + '/collections/' + userId));
    return response.data;
}

export const getCollectionById = async(collectionId) => {
    const response = await(api.get(REACT_APP_API_URL + '/collection/cid/' + collectionId));
    return response.data;
}

export const saveCollection = async(userId, collectionId) => {
    const body = {
        "userId" : userId,
        "collectionId" : collectionId
    }
    const response = await api.put(REACT_APP_API_URL + '/collection', body);
    return response.data;
}

export const boostCollection = async(collectionId) => {
    const body = {
        "collectionId" : collectionId
    }
    const response = await api.post(REACT_APP_API_URL + '/collection', body);
    return response.data;
}

export const createCollection = async(collection) => {
    const response = await api.post(REACT_APP_API_URL + '/collection/create', collection);
    return response.data;
}

export const getCollectionTitle = async(collectionId) => {
    const response = await api.get(REACT_APP_API_URL + '/collectionName/' + collectionId);
    return response.data;
}

export const addAppToCollection = async(appId,collectionId) => {
    const body = {
        "appId" : appId,
        "collectionId" : collectionId
    }
    const response = await api.post(REACT_APP_API_URL + '/collection/addApp',body);
    return response.data;

}

