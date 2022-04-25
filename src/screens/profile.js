import React, {useEffect,useState,useRef} from "react";
import GameList from '../components/game-list'
import {Link} from "react-router-dom";
import * as service from '../services/auth-service.js'
import {useSelector,useStore} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'

const Profile = () => {

    const dispatch = useDispatch();
    const user_data = useSelector(state => {
        return state.user_data
    });

    const store = useStore();

    const loggedIn = useSelector(state => {
        return state.loggedIn;
    })

    const games_array = useSelector(state => {
        return state.user_data.OwnedApps;
    })

    const recommended_apps = useSelector(state => {
        return state.user_data.RecommendedApps;
    })

    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfileData = async() => {
            if(loggedIn){
                return true;
            }
            const profile = await service.profile();

            if(profile){
                dispatch({"type":"LOGIN", "user_data":profile });
                return true;
            }
            return false;
        }

        const userLoggedIn = fetchProfileData();
        if(!userLoggedIn){
            navigate("/signin");
        }

    },[])


    return(
        <div>
        <h1>{user_data.UserName}</h1>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-6"}>
            <h3>Games You Own:</h3>
            <GameList gamesArray={games_array}/>
                    </div>
                    <div className={"col-6"}>
                        <h3>Games You Recommend:</h3>
                        <GameList gamesArray={store.getState().user_data.RecommendedApps}/>
                    </div>
                </div>
            </div>
        <Link className={"btn btn-danger"} to="/signin">Logout</Link>
    </div>)
}
export default Profile;