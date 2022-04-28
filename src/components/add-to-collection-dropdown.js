import React, {useState, useEffect} from 'react';
import * as collectionService from "../services/collection-service";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import {useStore} from "react-redux";


const AddToCollectionDropdown = (props) => {
    const appId = props.appId;

    const user_data = useStore().getState();
    const[collectionObjects,setCollectionObjects] = useState([]);

    useEffect( () => {
        const fetchCollectionObjects = async () => {
            const collectionsArray = await collectionService.getAllCollections();
            console.log("Retrieved Collections: ", collectionsArray);
            setCollectionObjects(collectionsArray);
        }
        fetchCollectionObjects();
    }, [])

    const getNameFromCollectionId = (collectionId) => {
        for(let i = 0; i < collectionObjects.length; i++) {
            if(collectionObjects[i]._id === collectionId) {
                console.log(collectionObjects[i].Title);
                return collectionObjects[i].Title;
            }
        }
        return "";
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
            disabled={!(user_data.UserType==="Curator")}
        >
            {user_data.CreatedCollections.map(c => <Dropdown.Item key={c} eventKey={c}>{getNameFromCollectionId(c)}</Dropdown.Item>)}
        </DropdownButton>
        </div>
    )
};

export default AddToCollectionDropdown;