import Game from '../components/game.js'
import {getOwnedGames} from "../services/steam-service.js"
import React, {useEffect} from 'react'

const GameList = (props) => {
    const userId = props.userId;
    const [gamesList, setGamesList] = React.useState([]);

    useEffect(() => {
        const fetchGamesList = async () => {
            const list = await getOwnedGames(userId);
            console.log(list);
            setGamesList(list);
        }
        fetchGamesList().catch(console.error);
    },[])


    if(!gamesList){
        return (
            <div>
                Make your Steam Profile Public if you want to see owned games!
            </div>
        )
    }

    return (
        <div>
            <ul>
                {gamesList.map(g => <li key={g.appid}> <Game gameObj={g}/></li>)}
            </ul>
        </div>
            );
};

export default GameList;