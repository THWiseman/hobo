import axios from 'axios';
const STEAM_API = 'http://localhost:4000/api/steam';
const USERS = [];

export const findUser = async (userId) => {
    const response = await axios.get(STEAM_API);
    const data = response.data;
    return data;
}

export const getOwnedGames = async (userId) => {
    const url = STEAM_API + "/getOwnedGames/" + userId;
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    return data;
}

export const searchGamesByTitle = async (gameName) => {
    const url = STEAM_API + "/getAppsByName/" + gameName;
    const response = await(axios.get(url));
    const data = response.data;
    return data;
}

export const getUserBySteamId = async (userId) => {
    console.log("getUserBySteamId");
    const url = STEAM_API + '/getUserInfo/' + userId;
    const response = await(axios.get(url));
    return response.data;
}
