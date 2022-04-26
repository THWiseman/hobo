import React, {useState,useEffect} from 'react'
import * as service from '../services/steam-service.js'
import {useParams} from "react-router-dom";
import {UPDATE_USER_DATA} from "../reducers/users/actions";
import {useDispatch, useSelector} from "react-redux";

const GameDetails = () => {
    //URL Parameters
    const params = useParams();
    const dispatch = useDispatch();

    const appId = params.appId;
    const bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appId + "/header.jpg";


    const[userRecommendsApp,setUserRecommendsApp] = useState(false);
    const user_data = useSelector((state) => {
        return state;
    });
    const recommendGame = async () => {
        service.recommendApp(user_data._id, appId);
        user_data.RecommendedApps.push(appId);
        dispatch({"type":UPDATE_USER_DATA, "user_data":user_data});
        setUserRecommendsApp(user_data.RecommendedApps.includes(appId));
    }

    const[appInfo, setAppInfo] = useState({
        "AppId" : appId,
        "AppCollections" : [],
        "OwnedBy" : [],
        "RecommendedBy" : [],
        "AnonymousRecommendations" : 0,
        "AppTitle" : "",
        "Price" : "",
    });

    useEffect( () => {
        const fetchAppInfo = async () => {
            const responseFromServer = await(service.getAppInfo(appId));
            console.log(responseFromServer);
            setAppInfo(responseFromServer);
        }
        fetchAppInfo();
    },[])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-6"}>
                    <img src={bannerURL} className={"img-fluid"}/>
                </div>
                <div className={"col-6 my-auto"}>
                    <h4>{appInfo && appInfo.AppTitle}</h4>
                    <div>Price: {appInfo.Price}</div>
                    <div><a href={"https://store.steampowered.com/app/" + appId}>Steam Store Page</a></div>
                    <div>Boosts: {appInfo.AnonymousRecommendations}</div>
                    <button className={"btn btn-primary pe-2 btn-sm float-end"} onClick={recommendGame} disabled={userRecommendsApp}>{!userRecommendsApp && "Recommend"}{userRecommendsApp && "Recommended"}</button>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;