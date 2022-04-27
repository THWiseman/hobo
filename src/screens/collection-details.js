import React, {useState,useEffect} from 'react';
import GameList from '../components/game-list.js'
import * as service from '../services/collection-service.js'
import {useParams,Link} from "react-router-dom";
import UserList from "../components/user-list";
import {useDispatch, useStore} from "react-redux";


const CollectionDetails = () => {
    //URL Parameters
    const params = useParams();
    const collectionId = params.collectionId;
    const user_data = useStore().getState();

    const[collection,setCollection]=useState({
        "Title" : "",
        "Creator" : "",
        "CreatorName" : "",
        "Apps" : [],
        "Followers": [],
        "AnonymousRecommendations": 0
    });

    const[display,setDisplay] = useState("Games");

    const clickGames = () => {
        setDisplay("Games");
    }

    const clickFollowers = () => {
        setDisplay("Followers");
    }

    const[boosts,setBoosts] = useState(0);
    const clickBoost = () => {
        service.boostCollection(collectionId);
        setBoosts(boosts+1);
    }


    const saveCollection = async () => {
        if(user_data.loggedIn){
            await service.saveCollection(user_data.userId,collectionId);
        }
    }

    useEffect( () => {
        const fetchCollection = async () => {
            const collectionFromServer = await service.getCollectionById(collectionId);
            setCollection(collectionFromServer);
        }
        fetchCollection();
    })

    return (
        <div>
        <div className="card">
            <div className="card-header">
                Created By: <Link to={'/userDetails/' + collection.Creator}>{collection.CreatorName}</Link>
            </div>
            <div className="card-body">
                <h5 className="card-title">{collection.Title}</h5>
                <button onClick={saveCollection} className={"btn btn-primary"} disabled={(!user_data.loggedIn || user_data.SavedCollections.includes(collectionId))}> Save Collection</button>
                <button onClick={clickBoost} className="btn btn-info">Boost</button>{" Boosts:" + collection.AnonymousRecommendations}

            </div>
            <div className="btn-group pb-4">
                <button onClick={clickGames} className={(display!=="Games") ? "btn btn-primary" : "btn btn-primary active"}>Games</button>
                <button onClick={clickFollowers} className={(display!=="Followers") ? "btn btn-primary" : "btn btn-primary active"}>Followers</button>
            </div>
        </div>
            {display==="Games" &&<GameList gamesArray={collection.Apps}/>}
            {display==="Followers" &&<UserList userIdArray={collection.Followers}/>}
        </div>
    );
};

export default CollectionDetails;