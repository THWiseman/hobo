import React, {useState,useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import GameList from '../components/game-list.js'
import * as service from "../services/steam-service";

const SteamSearch = () => {
    //URL Parameters
    const params = useParams();

    //Set state of input box to 'search'. Navigate to 'search/:search when button is pressed
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setSearch(event.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/search/" + search);
    }

    //Getting a list of app IDs from the URL
    const [gamesList, setGamesList] = React.useState([]);
    useEffect( () => {
        const fetchGamesList = async () => {
            const responseFromServer = await(service.searchGamesByTitle(params.query));
            setGamesList(responseFromServer.map(g=>parseInt(g.appid)));
        }
        if(params.query){
            fetchGamesList();
        }

    },[params.query])

    //If there is no query in the URL, return the search box
    if(!params.query){
        return(
            <div>
                <div className="input-group col-3">
                    <input value={search} onChange={handleChange} type="search" className="form-control rounded" placeholder="Search for Games" aria-label="Search"
                           aria-describedby="search-addon"/>
                    <button  onClick={handleSubmit} type="button" className="btn btn-outline-primary">Search</button>
                </div>
            </div>);
    } else{
        return (<div>
            <div className="input-group">
                <input value={search} onChange={handleChange} type="search" className="form-control rounded" placeholder="Search for Games" aria-label="Search"
                       aria-describedby="search-addon"/>
                <button  onClick={handleSubmit} type="button" className="btn btn-outline-primary">Search</button>
            </div>
            <h2>Search Results for: {search || params.query}</h2>
            <GameList gamesArray={gamesList}/>
        </div>)
    }
}
export default SteamSearch;