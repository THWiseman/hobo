import React, {useEffect,useState,useRef} from "react";
import GameList from '../components/game-list'
import {Link} from "react-router-dom";
import * as service from '../services/auth-service.js'
import {useSelector,useStore} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import CreateCollection from "../components/create-collection";
import CollectionList from "../components/collection-list";

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
        setDisplay("SavedCollections");
    }

    const clickPersonalInfo = () => {
        setDisplay("PersonalInfo");
    }

    const clickYourCollections = () => {
        setDisplay("YourCollections");
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
        if(!userLoggedIn){
            navigate("/signin");
        }

    },[])

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

    return(
        <div>
            <div className={"container"}>
                <div className={"row"}>
                        <h1>{user_data.UserName}
                        <Link className={"btn btn-danger float-end"} to="/signin">Logout</Link>
                        </h1>
                </div>
            </div>
            <div className="btn-group pb-4">
                <a className={(display==="Recommend") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickRecommend}>Your Recommendations</a>
                <a className={(display==="Owned") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickOwned}>Your Games</a>
                <a className={(display==="SavedCollections") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickSavedCollections}>Saved Collections</a>
                <a className={(display==="YourCollections") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickYourCollections}>Your Collections</a>
                <a className={(display==="PersonalInfo") ? "btn btn-primary active" : "btn btn-primary"} aria-current="page" onClick={clickPersonalInfo}>Personal Info</a>
            </div>

            {display==="Recommend" && gamesYouRecommend()}
            {display==="Owned" && gamesYouOwn()}
            {display==="SavedCollections" && savedCollections()}
            {display==="YourCollections" && yourCollections()}
    </div>)
}
export default Profile;