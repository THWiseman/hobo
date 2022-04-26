import axios from 'axios';
const STEAM_API = 'http://localhost:4000/api/steam';
const api = axios.create({withCredentials : true});

export const findUser = async (userId) => {
    const response = await axios.get(STEAM_API);
    const data = response.data;
    return data;
}

export const getOwnedGames = async (userId) => {
    const url = STEAM_API + "/getOwnedGames/" + userId;
    const response = await axios.get(url);
    const data = response.data;
    return data;
}

export const searchGamesByTitle = async (gameName) => {
    const url = STEAM_API + "/getAppsByName/" + gameName;
    const response = await(axios.get(url));
    const data = response.data;
    return data;
}

export const getUserBySteamId = async (userId) => {
    const url = STEAM_API + '/getUserInfo/' + userId;
    const response = await(axios.get(url));
    return response.data;
}

export const getBasicAppInfo = async (appId) => {
    const url = STEAM_API + '/getBasicAppInfo/' + appId;
    const response = await axios.get(url);
    return response.data;
}

export const getAppInfo = async (appId) => {
    const url = STEAM_API + '/getAppInfo/' + appId;
    const response = await(axios.get(url));
    return response.data;
}

export const recommendApp = async (userId, appId) => {
    const url = STEAM_API + '/recommendApp/';
    const message = {
        "userId" : userId,
        "appId" : appId
    };
    console.log(message);
    const response = await api.post(url,message);
    return response;
}

