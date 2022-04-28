import UserList from '../components/user-list'
import * as service from '../services/auth-service.js'
import {useState, useEffect} from "react";

const Curators = () => {
    const[curatorIdArray,setCuratorIdArray] = useState([]);

    useEffect(()=> {
        const fetchCurators = async () => {
            const array = await service.getAllCurators();
            const tempArray = [];
            array.map(c => tempArray.push(c._id));
            setCuratorIdArray(tempArray);
        }
         fetchCurators();

    },[])

    return (
        <div>
            <UserList userIdArray={curatorIdArray}/>
        </div>
    )
}

export default Curators;