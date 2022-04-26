import React from 'react';
import {useState,useEffect} from "react";
import * as service from '../services/auth-service'
const User = (props) => {

    const userId = props.userId;

    const[userObject,setUserObject] = useState({
        "UserName" : "",
        "SteamId" : 0,
        "UserType" : "Curator",
        "FollowedCurators" : [],
        "Followers" : [],
        "CreatedCollections" : [],
        "SavedCollections" : [],
        "PersonalInfo" : {
            "Name" : "",
            "Age" : "",
            "Address" : "",
            "Email" : "",
            "Password" : ""
        },
        "RecommendedApps" : [],
        "OwnedApps" : []
    });

    useEffect( () => {
        const fetchUserData = async () => {
            const userData = await service.getUserById(userId);
            setUserObject(userData);
        }
        fetchUserData();
    },[])

    return (
        <a href={"/userDetails/" + userId} className="list-group-item list-group-item-action flex-column align-items-start pt-2">
        <div>
            <h3>{userObject.UserName}</h3>
            Followers: {userObject.Followers.length}
            Collections: {userObject.CreatedCollections.length}
            Recommendations: {userObject.RecommendedApps.length}
        </div>
        </a>
    );
};

export default User;