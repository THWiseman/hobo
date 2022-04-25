import Game from '../components/game.js'
import React from 'react'

const GameList = (props) => {
    const gamesArray = props.gamesArray;

    if(!gamesArray){
        return (<div>
        </div>)
    }

    return (
        <div>
            <ul>
                {gamesArray.map(g => <li className={"list-group-item"} key={g}> <Game appId={g}/></li>)}
            </ul>
        </div>
            );
};

export default GameList;