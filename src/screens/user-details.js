import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as service from '../services/auth-service'
import GameList from "../components/game-list";
import CollectionList from "../components/collection-list";
import UserList from "../components/user-list";

const UserDetails = () => {

    const params = useParams();
    const user_id = params.userId;

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
                        <UserList usersArray={userObject.Followers}/>
                    </div>
                    <div className={"col"}>
                        <h4>Followed Curators</h4>
                        <UserList usersArray={userObject.FollowedCurators}/>
                    </div>
                </div>
            </div>
        )
    }




    return (
        <div>
            <div className="btn-group pb-4">
                <a className={(display==="RecommendedApps") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickRecommendedApps}>Recommended Apps</a>
                <a className={(display==="Collections") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickCollections}>Collections</a>
                <a className={(display==="FollowersAndFollowing") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickFollowersAndFollowing}>Followers and Following</a>
            </div>
            {display==="RecommendedApps" && recommendedApps()}
            {display==="Collections" && collections()}
            {display==="FollowersAndFollowing" && followersAndFollowing()}
        </div>
    );
};

export default UserDetails;