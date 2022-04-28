import Game from '../components/game.js'
import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import * as service from '../services/collection-service'
import * as authService from '../services/auth-service'
import {UPDATE_COLLECTIONS} from "../reducers/users/actions";


const GameList = (props) => {
    const gamesArray = props.gamesArray;
    const dispatch = useDispatch();


    useEffect( () => {
        const getAllCollections = async () => {
           const allCollections =  await service.getAllCollections();
            dispatch({type:UPDATE_COLLECTIONS, collections:allCollections});
        }
        const fetchProfileData = async() => {
            const profile = await authService.profile();
            if (profile) {
                dispatch({"type": "LOGIN", "user_data": profile});
                return true;
            }
        }
        fetchProfileData();
        getAllCollections();
    })

    if(!gamesArray){
        return (<div>
        </div>)
    }

    return (
        <div>
            <ul className={"list-group"}>
                {gamesArray.map(g => <Game appId={g}/>)}
            </ul>
        </div>
            );
};

export default GameList;