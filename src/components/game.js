import React, {useState,useEffect} from 'react'
import * as service from '../services/steam-service.js'
import * as collectionService from '../services/collection-service'
import {useSelector,useDispatch} from 'react-redux'
import {UPDATE_USER_DATA} from "../reducers/users/actions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';

const Game = (props) => {
    const appId = props.appId;
    const bannerURL = "https://steamcdn-a.akamaihd.net/steam/apps/" + appId + "/header.jpg";

    const dispatch = useDispatch();
    const[appInfo, setAppInfo] = useState();

    const user_data = useSelector((state) => {
        return state;
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
            const responseFromServer = await(service.getBasicAppInfo(appId));
            setAppInfo(responseFromServer);
        }
        fetchAppInfo();
        setUserRecommendsApp(user_data.RecommendedApps.includes(appId));
    },[user_data,appId])


    const getNameFromCollectionId = (collectionId) => {
        try {
            return user_data.Collections.find(element=>element._id===collectionId).Title;
        } catch (e) {
            return "";
        }

    }

    const handleSelect=(e)=>{
        collectionService.addAppToCollection(appId, e);
        console.log(e);
    }

    const addToCollection = () => {

        return(
            <DropdownButton
            title="Add To Collection"
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
            size={"sm"}
            variant={"info"}
            disabled={!(user_data.UserType==="Curator")}
        >
                {user_data.CreatedCollections.map(c => <Dropdown.Item key={c} eventKey={c}>{getNameFromCollectionId(c)}</Dropdown.Item>)}
        </DropdownButton>)
    }


    return (
        <li className="list-group-item list-group-item-action flex-column align-items-start pt-2">
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col"}>
                    <a href={"/gameDetails/" + appId}>
                    <img  src={bannerURL} className={"img-fluid"} alt={"Banner Img for app: " + appId.toString()}/>
                    </a>
                </div>
                <div className={"col text-center"}><h3>{appInfo && appInfo.AppTitle}</h3></div>
                <div className={"col"}>
                    <button className={"btn btn-primary pe-2 btn-sm float-end"} onClick={recommendGame} disabled={userRecommendsApp}>{!userRecommendsApp && "Recommend"}{userRecommendsApp && "Recommended"}</button>
                    <div className={"float-end"}>{addToCollection()} </div>
                </div>
            </div>
        </div>
        </li>
    );
}

export default Game;