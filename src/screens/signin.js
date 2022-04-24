import React, {useRef} from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom";
import * as service from "../services/auth-service.js"

const Signin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signin = async () => {
        try{
            const userData = await service.login(emailRef.current.value, passwordRef.current.value);
            dispatch({"type":"LOGIN", "user_data":userData });
            navigate('/profile');
        }catch (e) {
            alert("Sign in Failed.");
        }

    }
    return (
        <div>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="gfreeman@blackmesa.com" className={"form-control"} type={"email"} />
            <input ref={passwordRef} placeholder={"password"} className={"form-control"} type={"password"}/>
            <button onClick={signin} className={"btn btn-primary"}>Sign In</button>
        </div>
    );
};

export default Signin;