import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {searchGamesByTitle} from '../services/steam-service'

const SteamSearch = () => {
    //URL Parameters
    const params = useParams();

    //Getting a list of app IDs from the URL
    const [gamesList, setGamesList] = React.useState([]);
    const fetchGamesList = async () => {
        const list = await searchGamesByTitle(params.query);
        setGamesList(list);
    }
    if(params.query){
        fetchGamesList();
        console.log(gamesList);
    }else {
        console.log("no params");
    }

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

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="header-search">
                    <span className="visually-hidden">Half-Life 2</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Half-Life 2"
                    value = {search}
                    onChange = {handleChange}
                    name="s"
                />
                <button className ={"btn-warning"} type={"submit"}>Search</button>
            </form>
    </div>);
}
export default SteamSearch;