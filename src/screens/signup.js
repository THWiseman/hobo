import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import * as service from '../services/auth-service'

const Signup = () => {
    const dispatch = useDispatch();
    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [steamId,setSteamId] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSteamIdChange = (event) => {
        setSteamId(event.target.value);
    }

    const[userType,setUserType] = useState("Curator");

    const handleOptionChange = (event) => {
        setUserType(event.target.value);
    }

    const signup = async () => {
        const user ={
            "UserName" : userName,
            "SteamId" : steamId,
            "UserType" : userType,
            "FollowedCurators" : [],
            "Followers" : [],
            "CreatedCollections" : [],
            "SavedCollections" : [],
            "PersonalInfo" : {
                "Name" : "",
                "Age" : "",
                "Address" : "",
                "Email" : email,
                "Password" : password
            },
            "RecommendedApps" : [],
            "OwnedApps" : []
        }
        try {
            const userData = await service.signup(user);
            dispatch({"type":"LOGIN", "user_data":userData });
            navigate('/profile')
        } catch (e) {
            alert("Error");
        }
    }
    return (

        <form>
            <h1 className={"text-center"}>Sign Up For Steam Collector</h1>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
            <div className="form-group pt-2">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input value={userName} onChange={handleUsernameChange} type="username" className="form-control" icd="inputusername" aria-describedby="usernameHelp"
                       placeholder="xXPickUpThatCanXx"/>
            </div>
                    </div>
                    <div className={"col"}>
            <div className="form-group pt-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input value={password} onChange={handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="i<3alyx"/>
            </div>
                </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <div className="form-group pt-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={email} onChange={handleEmailChange} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"
                               placeholder="gfreeman@blackmesa.com"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                        </div>
                    </div>
                    <div className={"col"}>
                        <div className="form-group pt-2">
                            <label htmlFor="exampleInputEmail1">Link with Steam Profile (optional but highly recommended)</label>
                            <input value={steamId} onChange={handleSteamIdChange} type="text" className="form-control" id="exampleInputSteamId" aria-describedby="steamIdHelp"
                                   placeholder="76561197978497049"/>
                            <small id="steamHelp" className="form-text text-muted">Paste your Steam ID Number here. You can find it at <a href={"https://store.steampowered.com/account/"}>https://store.steampowered.com/account/</a>.
                                &nbsp; Your steam profile must be public for this website to access it.</small>
                        </div>
                    </div>
                    </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <h4>Account Type:</h4>
                        <div className="form-check pt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                   value="User" defaultChecked={true} onChange={handleOptionChange}/>
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                <strong>User:</strong> I have exquisite taste in video games. I want to curate collections of games and share them with the world.
                            </label>
                        </div>
                        <div className="form-check pt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                   value="User" onChange={handleOptionChange}/>
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                <strong>User:</strong> My steam library is too small. I want to browse collections, follow curators, and recommend the best ones to my friends.
                            </label>
                        </div>
                        <div className="form-check pt-2">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"
                                   value="Lurker" onChange={handleOptionChange}/>
                            <label className="form-check-label" htmlFor="exampleRadios3">
                                <strong>Lurker:</strong> I'm just lurking.
                            </label>
                        </div>
                </div>

                </div>
            <button onClick={signup} type={"button"} className="btn btn-primary btn-lg w-100 m-2">Submit</button>
            </div>
        </form>
    );
};

export default Signup;