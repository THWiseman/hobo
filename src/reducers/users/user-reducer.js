import {LOGIN,LOGOUT,UPDATE_USER_DATA} from './actions'

const initialState = {
    loggedIn : false,
    _id: "",
    UserName : "",
    SteamId : 0,
    UserType : "Curator",
    FollowedCurators : [],
    Followers : [],
    CreatedCollections : [],
    SavedCollections : [],
    PersonalInfo : {
        "Name" : "",
        "Age" : "",
        "Address" : "",
        "Email" : "",
        "Password" : ""
    },
    RecommendedApps : [],
    OwnedApps : []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("login from reducer");
            return {
                ...state,
                loggedIn: true,
                _id : action.user_data._id,
                UserName : action.user_data.UserName,
                SteamId : action.user_data.SteamId,
                UserType : action.user_data.UserType,
                FollowedCurators : action.user_data.FollowedCurators,
                Followers : action.user_data.Followers,
                CreatedCollections : action.user_data.CreatedCollections,
                SavedCollections : action.user_data.SavedCollections,
                PersonalInfo : action.user_data.PersonalInfo,
                RecommendedApps : action.user_data.RecommendedApps,
                OwnedApps : action.user_data.OwnedApps
            }
        case LOGOUT:
            return {
                loggedIn : false,
                _id : "",
                UserName : "",
                SteamId : 0,
                UserType : "Curator",
                FollowedCurators : [],
                Followers : [],
                CreatedCollections : [],
                SavedCollections : [],
                PersonalInfo : {
                    "Name" : "",
                    "Age" : "",
                    "Address" : "",
                    "Email" : "",
                    "Password" : ""
                },
                RecommendedApps : [],
                OwnedApps : []
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                loggedIn: true,
                _id : action.user_data._id,
                UserName : action.user_data.UserName,
                SteamId : action.user_data.SteamId,
                UserType : action.user_data.UserType,
                FollowedCurators : action.user_data.FollowedCurators,
                Followers : action.user_data.Followers,
                CreatedCollections : action.user_data.CreatedCollections,
                SavedCollections : action.user_data.SavedCollections,
                PersonalInfo : action.user_data.PersonalInfo,
                RecommendedApps : action.user_data.RecommendedApps,
                OwnedApps : action.user_data.OwnedApps
            }
        default:
            return state;
    }
}
export default userReducer;