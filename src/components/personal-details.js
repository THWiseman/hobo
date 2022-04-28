import React, {useState,useEffect} from 'react';
import {useDispatch, useStore} from "react-redux";
import * as service from '../services/auth-service'
import {UPDATE_USER_DATA} from "../reducers/users/actions";

const PersonalDetails = () => {

    const user_data = useStore().getState();
    const dispatch = useDispatch();

    const[userType,setUserType] = useState(user_data.UserType);
    const[age,setAge] = useState(user_data.PersonalInfo.Age);
    const[email,setEmail] = useState(user_data.PersonalInfo.Email);
    const[password,setPassword] = useState(user_data.PersonalInfo.Password);
    const[address,setAddress] = useState(user_data.PersonalInfo.Address);

    const handleOptionChange = (event) => {
        setUserType(event.target.value);
    }

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }

    const[mode,setMode] = useState("Display");
    const clickDisplay = () => (setMode("Display"));
    const clickEdit = () => (setMode("Edit"));

    const handleSave = async () => {
        console.log("HandleSave");
        const updatedUser = {
            "_id" :  user_data._id,
            "UserName" : user_data.UserName,
            "SteamId" : user_data.SteamId,
            "UserType" : userType,
            "FollowedCurators" : user_data.FollowedCurators,
            "Followers" : user_data.Followers,
            "CreatedCollections" : user_data.CreatedCollections,
            "SavedCollections" : user_data.SavedCollections,
            "PersonalInfo" : {
            "Name" : user_data.PersonalInfo.Name,
                "Age" : age,
                "Address" : address,
                "Email" : email,
                "Password" : password
        },
            "RecommendedApps" : user_data.RecommendedApps,
            "OwnedApps" : user_data.OwnedApps
        }
        console.log("updatedUser", updatedUser)
        const userFromDb = await service.updateUserPersonalInfo(updatedUser);
        console.log("userFromDb", userFromDb);
        dispatch({type: UPDATE_USER_DATA, user_data: userFromDb});
    }



    return (
<>
        <form>
            <div className="row">
                <div className="col">
                    <label for={"emailId"}>Email Address</label>
                    <input type="text" onChange={handleEmailChange} defaultValue={user_data.PersonalInfo.Email} className="form-control" placeholder="Email" id={"emailId"} aria-label="Email"/>
                </div>
                <div className="col">
                    <label htmlFor={"passwordId"}>Password</label>
                    <input type="password" onChange={handlePasswordChange} defaultValue={user_data.PersonalInfo.Password} className="form-control" placeholder="Password" id={"passwordId"} aria-label="Password"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor={"addressId"}>Address</label>
                    <input type="text" onChange={handleAddressChange} defaultValue={user_data.PersonalInfo.Address} className="form-control" placeholder="Address" id={"addressId"}
                           aria-label="Address"/>
                </div>
                <div className="col">
                    <label htmlFor={"ageId"}>Age</label>
                    <input type="text" onChange={handleAgeChange} defaultValue={user_data.PersonalInfo.Age} className="form-control" placeholder="Age" id={"ageId"}
                           aria-label="Last name"/>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <h6 className={"pt-4"}>Account Type:</h6>
                    <div className="form-check pt-1">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                               value="Curator" defaultChecked={user_data.UserType==="Curator"} onChange={handleOptionChange}/>
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            <strong>Curator:</strong> I have exquisite taste in video games. I want to curate collections of games and share them with the world.
                        </label>
                    </div>
                    <div className="form-check pt-2">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                               value="User" defaultChecked={user_data.UserType==="User"} onChange={handleOptionChange}/>
                        <label className="form-check-label" htmlFor="exampleRadios2">
                            <strong>User:</strong> My steam library is too small. I want to browse collections, follow curators, and recommend the best ones to my friends.
                        </label>
                    </div>
                    <div className="form-check pt-2">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"
                               value="Lurker" defaultChecked={user_data.UserType==="Lurker"} onChange={handleOptionChange}/>
                        <label className="form-check-label" htmlFor="exampleRadios3">
                            <strong>Lurker:</strong> I'm just lurking.
                        </label>
                    </div>
                </div>
            </div>
        </form>
    <div className={"row pt-2"}>
        <button onClick={handleSave} type={"button"} className={"btn btn-primary"}>Save</button>
    </div>
</>
    );
};

export default PersonalDetails;