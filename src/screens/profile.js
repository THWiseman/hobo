import React, {useEffect} from "react";
import GameList from "../components/game-list"
import {useParams} from "react-router-dom";
import {getUserBySteamId, searchGamesByTitle} from "../services/steam-service";

const Profile = () => {
    //URL Parameters
    const params = useParams();

    //Fetch data from server
    const [userData, setUserData] = React.useState({"steam":{"players":[{"steamid":"","communityvisibilitystate":3,"profilestate":1,"personaname":"","commentpermission":1,"profileurl":"","avatar":"","avatarmedium":"","avatarfull":"","avatarhash":"","lastlogoff":1650660946,"personastate":3,"realname":"","primaryclanid":"","timecreated":1209901089,"personastateflags":0}]},
        "db":{"UserType":"User","Followers":[],"CreatedCollections":[],"UserName":"hi","SteamId":0,"FollowedCurators":[],"SavedCollections":[],"PersonalInfo":{"_id":"","Name":"","Age":28,"Address":"","Password":""},"RecommendedApps":[],"OwnedApps":[]}}
    );


    useEffect( () => {
        const fetchUserData = async () => {
            const data = await getUserBySteamId(params.steamId);
            setUserData(data);
        }
        fetchUserData().catch(console.error);
    },[])


    return(<div>
        <h1>{userData.db.UserName}</h1>
        <GameList userId={params.steamId}/>
    </div>)
}
export default Profile;