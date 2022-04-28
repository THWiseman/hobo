import React, {useState, useEffect} from 'react';
import * as collectionService from "../services/collection-service";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import * as service from "../services/auth-service";


const AddToCollectionDropdown = (props) => {
    const appId = props.appId;
    const userId = props.userId;

    const[userObject,setUserObject] = useState({
        "_id" : "",
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
            console.log("UserID: ", userId);
            console.log("AppId : ", appId);
            const userData = await service.getUserById(userId);
            console.log(userData);
            setUserObject(userData);
        }

        fetchUserData();
    },[userId])



    const getNameFromCollectionId = (collectionId) => {
        try {
            return userObject.Collections.find(element=>element._id===collectionId).Title;
        } catch (e) {
            return "";
        }

    }

    const handleSelect=(e)=>{
        collectionService.addAppToCollection(appId, e);
    }


    return(
        <div>
        <DropdownButton
            title="Add To Collection"
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
            size={"sm"}
            variant={"info"}
            disabled={!(userObject.UserType==="Curator")}
        >
            {userObject.CreatedCollections.map(c => <Dropdown.Item key={c} eventKey={c}>{getNameFromCollectionId(c)}</Dropdown.Item>)}
        </DropdownButton>)
        </div>
    )
};

export default AddToCollectionDropdown;