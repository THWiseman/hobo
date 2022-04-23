import {ADD_USER} from './actions'
import {UPDATE_USER} from './actions'
import {DELETE_USER} from './actions'


const defaultUser = {
    _id : 0,
    userName: "Hobo Hero",
    steamId: 76561197978497049,
    following: [],
    followers: [],
    recommendedGames: [],
}

const initialUserState = {
    numUsers : 0,
    users: [defaultUser],
};

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [
                    ...state.users, action.user ]
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(u => u._id === action.user._id ? action.user : u)
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(u => u._id != action.user._id)
            }
        default:
            return state;
    }
}
export default userReducer;