import axios from 'axios'
const api = axios.create({withCredentials : true});

const API_URL = 'http://localhost:4000/api/steamcollector';

export const getAllCollections = async() => {
    const response = await(api.get(API_URL + '/collections'));
    return response.data;
}

export const getCollectionsMadeByUser = async(userId) => {
    const response = await(api.get(API_URL + '/collections/' + userId));
    return response.data;
}

export const getCollectionById = async(collectionId) => {
    const response = await(api.get(API_URL + '/collection/cid/' + collectionId));
    return response.data;
}

export const saveCollection = async(userId, collectionId) => {
    const body = {
        "userId" : userId,
        "collectionId" : collectionId
    }
    const response = await api.put(API_URL + '/collection', body);
    return response.data;
}

export const boostCollection = async(collectionId) => {
    const body = {
        "collectionId" : collectionId
    }
    const response = await api.post(API_URL + '/collection', body);
    return response.data;
}

export const createCollection = async(collection) => {
    const response = await api.post(API_URL + '/collection/create', collection);
    return response.data;
}

export const getCollectionTitle = async(collectionId) => {
    const response = await api.get(API_URL + '/collectionName/' + collectionId);
    return response.data;
}