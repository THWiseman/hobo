import React, {useState, useEffect} from 'react';
import * as service from '../services/collection-service'
import {useSelector, useDispatch} from "react-redux";
import {UPDATE_USER_DATA} from "../reducers/users/actions";

const Collection = (props) => {
    const collectionId = props.collectionId;

    const dispatch = useDispatch();
    const user_data = useSelector((state) => {
        return state;
    });

    const[userSavedCollection,setUserSavedCollection] = useState(false);
    const[collection,setCollection] = useState({
        "Title" : "",
        "Creator" : "",
        "CreatorName" : "",
        "Apps" : [],
        "Followers" : [],
        "AnonymousRecommendations" : 0
    })

    useEffect( () => {
        const fetchCollection = async () => {
            const response = await service.getCollectionById(collectionId);
            setCollection(response);
        }
        fetchCollection();
        setUserSavedCollection(user_data.SavedCollections.includes(collectionId));

    },[user_data.SavedCollections, collectionId])

    const saveCollection = async () => {
        const updatedUser = await service.saveCollection(user_data._id, collectionId);
        dispatch({"type":UPDATE_USER_DATA, "user_data":updatedUser});
        setUserSavedCollection(updatedUser.SavedCollections.includes(collectionId));
    }

    const[boosts,setBoosts] = useState(0);

    const boostCollection = async () => {
        service.boostCollection(collectionId);
        setBoosts(boosts+1);
    }




    return (
        <div className={"pt-2"}>
            <a href={"/collection/" + collectionId} className="list-group-item list-group-item-action flex-column align-items-start pt-2 bg-info">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{collection.Title}</h5>
                    <h5>{"by: "+collection.CreatorName}</h5>
                </div>
            </a>
            <div className={"list-group-item flex-column align-items-start bg-light"}>
                <p className="mb-1">Games: {collection.Apps.length}</p>
                <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">Saves: {userSavedCollection? collection.Followers.length+1 : collection.Followers.length}</p>
                    {<button className={"btn btn-primary btn-sm"} onClick={saveCollection} disabled={userSavedCollection}>{!userSavedCollection && "Save"}{userSavedCollection && "Saved"}</button>
                    }
                </div>
                <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">Boosts: {collection.AnonymousRecommendations + boosts}</p>
                    {<button className={"btn btn-info btn-sm"} onClick={boostCollection}>Boost!</button>
                    }
                </div>
        </div>
        </div>
    );
};

export default Collection;