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

    <a href={"/userDetails/" + userId} className={"text-decoration-none p-2"}>
    <div className="card">
        <div className="card-header text-dark">
            {userObject.UserType}
        </div>
        <div className="card-body">
            <h5 className="card-title">{userObject.UserName}</h5>
            <ul className="list-group card-text">
                <li className="list-group-item bg-light ">Followers: {userObject.Followers.length}</li>
                <li className="list-group-item bg-light">Collections: {userObject.CreatedCollections.length}</li>
                <li className="list-group-item bg-light">Recommendations: {userObject.RecommendedApps.length}</li>
            </ul>
        </div>
    </div>
    </a>
    );
};

export default User;