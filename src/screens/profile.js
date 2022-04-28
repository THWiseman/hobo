import React, {useEffect,useState} from "react";
import GameList from '../components/game-list'
import {Link} from "react-router-dom";
import * as service from '../services/auth-service.js'
import {useSelector,useStore} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import CreateCollection from "../components/create-collection";
import CollectionList from "../components/collection-list";
import UserList from "../components/user-list";
import PersonalDetails from "../components/personal-details";

const Profile = () => {

    const dispatch = useDispatch();
    const user_data = useStore().getState();

    const[display,setDisplay] = useState("Recommend");
    const clickRecommend = () => {
        setDisplay("Recommend");
    }

    const clickOwned = () => {
        setDisplay("Owned");
    }

    const clickSavedCollections = () => {
        console.log(user_data);
        setDisplay("SavedCollections");
    }

    const clickPersonalInfo = () => {
        setDisplay("PersonalInfo");
    }

    const clickYourCollections = () => {
        setDisplay("YourCollections");
    }

    const clickCuratorsYouFollow = () => {
        setDisplay("CuratorsYouFollow");
    }

    const clickFollowers = () => {
        setDisplay("Followers");
    }
    const store = useStore();

    const loggedIn = useSelector(state => {
        return state.loggedIn;
    })

    const games_array = useSelector(state => {
        return state.OwnedApps;
    })

    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfileData = async() => {
            if(loggedIn){
                return true;
            }
            const profile = await service.profile();

            if(profile){
                dispatch({"type":"LOGIN", "user_data":profile });
                return true;
            }
            return false;
        }

        const userLoggedIn = fetchProfileData();
        if(!userLoggedIn || user_data.UserName===""){
            navigate("/signin");
        }

    })

    const gamesYouOwn = () => {
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <GameList gamesArray={games_array}/>
                    </div>
                </div>
            </div>
        )
    }

    const gamesYouRecommend = () => {
        if(store.getState().RecommendedApps.length===0){
            return(<div>Link Your Steam Account to see the games you already own!</div>)
        }
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <GameList gamesArray={store.getState().RecommendedApps}/>
                    </div>
                </div>
            </div>
        )
    }

    const yourCollections = () => {
        let stuff = [];
        if(user_data.CreatedCollections){
            stuff = user_data.CreatedCollections;
        }
        return(
            <div>
                <div className={"pb-4"}>
                <CreateCollection/>
                </div>
                <CollectionList collectionArray={stuff}/>
            </div>
        )
    }

    const savedCollections = () => {
        let savedCollections = [];
        savedCollections = user_data.SavedCollections;
        return(
            <div>
                <CollectionList collectionArray={savedCollections}/>
            </div>
        )
    }

    const curatorsYouFollow = () => {
        return (
            <div>
                <h4 className={'mx-auto'}>Curators You Follow: </h4>
                <UserList userIdArray={user_data.FollowedCurators}/>
            </div>
        )
    }

    const followers = () => {
        return (
            <div>
                <h4 className={'mx-auto'}>Your Followers: </h4>
                <UserList userIdArray={user_data.Followers}/>
            </div>
        )
    }

    const lurkerPage = () => {
        return(
            <h4>Lurker users don't have a profile, and can't create or save collections. Make a different account type to have a persistent profile.</h4>
            )

    }

    return(
        <div>
            <div className={"container"}>
                <div className={"row"}>
                        <h1>{user_data.UserName}
                        <Link className={"btn btn-danger float-end"} to="/signin">Logout</Link>
                        </h1>
                </div>
            </div>
            {user_data.UserType!=="Lurker" &&
            <div className="btn-group pb-4">
                <button className={(display==="Owned") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickOwned}>Games You Own</button>
                <button className={(display==="Recommend") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickRecommend}>Games You Recommend</button>
                <button className={(display==="SavedCollections") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickSavedCollections}>Collections You Like</button>
                <button className={(display==="YourCollections") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickYourCollections}>Collections You Made</button>
                <button className={(display==="CuratorsYouFollow") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickCuratorsYouFollow}>Curators You Follow</button>
                <button className={(display==="Followers") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickFollowers}>Users Following You</button>
                <button className={(display==="PersonalInfo") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickPersonalInfo}>Personal Info</button>
            </div>}
            {user_data.UserType==="Lurker" && lurkerPage()}
            {display==="Recommend" && user_data.UserType!=="Lurker" && gamesYouRecommend()}
            {display==="Owned" && user_data.UserType!=="Lurker" && gamesYouOwn()}
            {display==="SavedCollections" && user_data.UserType!=="Lurker" && savedCollections()}
            {display==="YourCollections" && user_data.UserType!=="Lurker" && yourCollections()}
            {display==="CuratorsYouFollow" && user_data.UserType!=="Lurker" && curatorsYouFollow()}
            {display==="Followers" && user_data.UserType!=="Lurker" && followers()}
            {display==="PersonalInfo" && user_data.UserType!=="Lurker" && <PersonalDetails/>}
    </div>)
}
export default Profile;