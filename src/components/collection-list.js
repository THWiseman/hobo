import Collection from '../components/collection.js'
import React from 'react'

const CollectionList = (props) => {
    const collectionArray = props.collectionArray;

    return(
        <ul className={"list-group"}>
            {collectionArray.map(c => <Collection collectionId={c}/>)}
        </ul>
    )
}

export default CollectionList;