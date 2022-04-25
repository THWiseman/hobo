import React, {useState,useEffect} from 'react'
import * as service from '../services/steam-service.js'
import {useParams} from "react-router-dom";

const GameDetails = () => {
    //URL Parameters
    const params = useParams();

    const appId = params.appId;
    //const imgURL = "http://media.steampowered.com/steamcommunity/public/images/apps/" + appId + "/" + imgIconUrl;
    const bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appId + "/header.jpg";

    const[appInfo, setAppInfo] = useState();

    useEffect( () => {
        const fetchAppInfo = async () => {
            const responseFromServer = await(service.getAppInfo(appId));
            console.log("Fetched app info:");
            console.log(responseFromServer);
            setAppInfo(responseFromServer);
        }
        fetchAppInfo();
    },[])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-3"}>
                    <img src={bannerURL} className={"img-fluid"}/>
                </div>
                <div className={"col-9 my-auto"}><h4>{appInfo && appInfo.AppTitle}</h4></div>
            </div>
        </div>
    );
}

export default GameDetails;