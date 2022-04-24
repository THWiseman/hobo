import React, {useEffect,useState,useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";

const Profile = () => {

    const user_data = useSelector(state => {
        return state.user_data
    });

    const loggedIn = useSelector(state => {
        return state.loggedIn;
    })

    //redirect user to sign in page if they're not logged in.
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user_data);
        if(!loggedIn){
            navigate("/signin");
        }
    })

    return(

        <div>
        <h1>{user_data.UserName}</h1>
        <Link className={"btn btn-danger"} to="/signin">Logout</Link>
    </div>)
}
export default Profile;