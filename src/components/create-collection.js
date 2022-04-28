import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as service from "../services/collection-service"
import {UPDATE_USER_DATA} from "../reducers/users/actions";
const CreateCollection = () => {

    const[collectionName,setCollectionName] = useState("");
    const dispatch = useDispatch();

    const user_data = useSelector((state) => {
        return state;
    });

    const handleCollectionNameChange = (event) => {
        setCollectionName(event.target.value);
    }

    const handleSubmit = async () => {
        const newCollection = {
            "Title" : collectionName,
            "Creator" : user_data._id,
            "CreatorName" : user_data.UserName,
            "Apps" : [],
            "Followers": [],
            "AnonymousRecommendations": 0
        }
        const collectionFromDb = await service.createCollection(newCollection);
        user_data.CreatedCollections.push(collectionFromDb._id);
        dispatch({"type":UPDATE_USER_DATA, "user_data":user_data});
    }

    if(user_data.UserType!=="Curator"){
        return(
            <div>
                <h4>Only Curators can make new collections.</h4>
            </div>
        )
    }

    return (
        <div>
            <form>
                <div className="row">
                    <div className="col-6">
                        Create New Collection:
                        <input value={collectionName} onChange={handleCollectionNameChange} type="text" className="form-control" placeholder="Collection Name"/>
                    </div>
                    <div className="col-3">
                        Created By:
                        <input value={user_data.UserName} type="text" className="form-control" placeholder="Username" disabled={true}/>
                    </div>
                    <div className={"col-3"}>
                        <button onClick={handleSubmit} type={"button"} className="btn btn-success w-100 mt-4">Create</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateCollection;