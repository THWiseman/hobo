import React, {useEffect, useState} from 'react'
import Signup from "./signup";
import Signin from './signin'
import * as service from '../services/steam-service.js'
import GameList from "../components/game-list";

const LandingPage = () => {

    const[gameArray,setGameArray] = useState([]);

    useEffect(() => {
        const fetchGameArray = async () => {
            let id = "76561197978497049";
            const array = await service.getRecentlyPlayedGames(id);
            console.log(array);
            setGameArray(array);
        }
        fetchGameArray();
    },[])

    return(
        <div className={"container"}>
            <div className={"row text-center"}>
                <h2>Welcome to The Steam Collector</h2>
                <h4>Discover collections of games, curate your own, and follow others with the same taste as you. </h4>
                <h6>Works best when you link your steam account.</h6>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <Signin/>
                </div>
                <div className={"col"}>
                    <GameList gamesArray={gameArray}/>
                </div>
            </div>

        </div>);
}
export default LandingPage;