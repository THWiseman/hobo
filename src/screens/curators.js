import Curator from '../components/curator.js'
import * as service from '../services/auth-service.js'
import {useState, useEffect} from "react";

const Curators = () => {
    const[curatorArray,setCuratorArray] = useState([]);

    useEffect(()=> {
        const fetchCurators = async () => {
            const array = await service.getAllCurators();
            console.log(array);
            setCuratorArray(array);
        }
         fetchCurators();

    },[])

    return (
        <div>
            <ul>
                {curatorArray.map(u => <li className={"list-group-item"} key={u}> <Curator curator={u}/> </li>)}
            </ul>
        </div>
    )
}

export default Curators;