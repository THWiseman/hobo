import React, {useState, useEffect} from 'react';
import * as service from '../services/collection-service'
import CollectionList from '../components/collection-list'
const BrowseCollections = () => {

    const[collectionsArray,setCollectionsArray] = useState([]);


    useEffect( () => {
        const fetchCollectionsArray = async () => {
            const collectionsFromServer = await service.getAllCollections();
            const collectionIds = [];
            collectionsFromServer.forEach((x,i) => collectionIds.push(x._id));
            console.log(collectionIds);
            setCollectionsArray(collectionIds);
        }
        fetchCollectionsArray();
    },[])

    return (
        <div>
            <CollectionList collectionArray={collectionsArray}/>
        </div>
    );
};

export default BrowseCollections;