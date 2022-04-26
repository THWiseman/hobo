import React, {useState,useEffect} from 'react';
import GameList from '../components/game-list.js'
import * as service from '../services/collection-service.js'
import {useParams} from "react-router-dom";

const CollectionDetails = () => {
    //URL Parameters
    const params = useParams();
    const collectionId = params.collectionId;

    const[collection,setCollection]=useState({
        "Title" : "",
        "Creator" : "",
        "CreatorName" : "",
        "Apps" : [],
        "Followers": [],
        "AnonymousRecommendations": 0
    });

    useEffect( () => {
        const fetchCollection = async () => {
            const collectionFromServer = await service.getCollectionById(collectionId);
            setCollection(collectionFromServer);
        }
        fetchCollection();
    })

    return (
        <div className={"container"}>
            <div className={"row"}>
                <h2>{collection.Title}</h2>
            </div>
            <div className={"row"}>
                Created By: {collection.CreatorName} <br/>
                Followers: {collection.Followers.length}<br/>
                Boosts: {collection.AnonymousRecommendations}<br/>
            </div>
            <div className={"row"}>
                <GameList gamesArray={collection.Apps}/>
            </div>
        </div>
    );
};

export default CollectionDetails;