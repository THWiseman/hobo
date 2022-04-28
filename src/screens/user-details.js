import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useStore} from "react-redux";
import * as service from '../services/auth-service'
import GameList from "../components/game-list";
import CollectionList from "../components/collection-list";
import UserList from "../components/user-list";
import {UPDATE_USER_DATA} from "../reducers/users/actions";

const UserDetails = () => {

    const params = useParams();
    const user_id = params.userId;

    const loggedInUserData = useStore().getState();
    const dispatch = useDispatch();

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

    useEffect(() => {
        const fetchUserData = async () => {
            const user_data = await service.getUserById(user_id);
            setUserObject(user_data);
        }
        fetchUserData();

    },[])

    const[display,setCurrentDisplay] = useState("RecommendedApps");

    const clickRecommendedApps = () => {
        setCurrentDisplay("RecommendedApps");
    }

    const recommendedApps = () => {
        return <GameList gamesArray={userObject.RecommendedApps}/>
    }

    const clickCollections = () => {
        setCurrentDisplay("Collections");
    }

    const collections = () => {
        return (

            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h4>Created Collections</h4>
                        <CollectionList collectionArray={userObject.CreatedCollections}/>
                    </div>
                    <div className={"col"}>
                        <h4>Saved Collections</h4>
                        <CollectionList collectionArray={userObject.SavedCollections}/>
                    </div>
                </div>
            </div>
        )
    }

    const clickFollowersAndFollowing = () => {
        setCurrentDisplay("FollowersAndFollowing");
    }

    const followersAndFollowing = () => {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h4>Followers</h4>
                        <UserList userIdArray={userObject.Followers}/>
                    </div>
                    <div className={"col"}>
                        <h4>Followed Curators</h4>
                        <UserList userIdArray={userObject.FollowedCurators}/>
                    </div>
                </div>
            </div>
        )
    }


const followCurator = async () => {
    const loggedInUser = await service.followCurator(loggedInUserData._id, userObject._id);
    console.log(loggedInUser);
    dispatch({type:UPDATE_USER_DATA,loggedInUser});
}

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    {userObject.UserType}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{userObject.UserName}</h5>
                    <button onClick={followCurator} className={"btn btn-primary"} disabled={!(userObject.UserType==="Curator" && loggedInUserData.UserType !== "Lurker" && !loggedInUserData.FollowedCurators.includes(userObject._id))}> Follow Curator</button>
                </div>
            </div>
            <div className="btn-group pb-4">
                <button className={(display==="RecommendedApps") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickRecommendedApps}>Recommended Apps</button>
                <button className={(display==="Collections") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickCollections}>Collections</button>
                <button className={(display==="FollowersAndFollowing") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickFollowersAndFollowing}>Followers and Following</button>
            </div>
            {display==="RecommendedApps" && recommendedApps()}
            {display==="Collections" && collections()}
            {display==="FollowersAndFollowing" && followersAndFollowing()}
        </div>
    );
};

export default UserDetails;