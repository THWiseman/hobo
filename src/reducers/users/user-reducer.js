import {LOGIN,LOGOUT,UPDATE_USER_DATA,UPDATE_STEAM_DATA} from './actions'

const initialState = {
    loggedIn : false,
    user_data: {},
    steam_data: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("login from reducer");
            return {
                ...state,
                loggedIn: true,
                user_data: action.user_data
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user_data: {},
                steam_data: {}
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                user_data : action.user_data
            }
        case UPDATE_STEAM_DATA:
            return {
                ...state,
                steam_data : action.steam_data
            }
        default:
            return state;
    }
}
export default userReducer;