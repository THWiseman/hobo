import React, {useState,useEffect} from 'react'
import * as service from '../services/steam-service.js'
import {useSelector,useDispatch} from 'react-redux'
import {UPDATE_USER_DATA} from "../reducers/users/actions";

const Game = (props) => {
    const appId = props.appId;
    //const imgURL = "http://media.steampowered.com/steamcommunity/public/images/apps/" + appId + "/" + imgIconUrl;
    const bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appId + "/header.jpg";

    const dispatch = useDispatch();
    const[appInfo, setAppInfo] = useState();

    const user_data = useSelector((state) => {
        return state.user_data
    });

    const[userRecommendsApp,setUserRecommendsApp] = useState(false);


    const recommendGame = async () => {
        service.recommendApp(user_data._id, appId);
        user_data.RecommendedApps.push(appId);
        dispatch({"type":UPDATE_USER_DATA, "user_data":user_data});
        setUserRecommendsApp(user_data.RecommendedApps.includes(appId));
    }

    useEffect( () => {
        const fetchAppInfo = async () => {
            const responseFromServer = await(service.getAppInfo(appId));
            setAppInfo(responseFromServer);
        }
        fetchAppInfo();
        setUserRecommendsApp(user_data.RecommendedApps.includes(appId));
    },[user_data])



    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-3"}>
            <img src={bannerURL} className={"img-fluid"}/>
                </div>
                <div className={"col-9 my-auto"}>{appInfo && appInfo.AppTitle}</div>
            </div>
            <div className={"row pt-2"}>
                <div className={"col-4"}>
            <button className={"btn btn-primary btn-sm"} onClick={recommendGame} disabled={userRecommendsApp}>{!userRecommendsApp && "Recommend"}{userRecommendsApp && "Recommended"}</button>
                </div>
                <div className={"col-4"}>
                    <button className={"btn btn-primary btn-sm"} onClick={recommendGame} disabled={userRecommendsApp}>{!userRecommendsApp && "Recommend"}{userRecommendsApp && "Recommended"}</button>
                </div>
                <div className={"col-4"}>
                    <button className={"btn btn-primary btn-sm"} onClick={recommendGame} disabled={userRecommendsApp}>{!userRecommendsApp && "Recommend"}{userRecommendsApp && "Recommended"}</button>
                </div>
            </div>

        </div>
    );
}

export default Game;