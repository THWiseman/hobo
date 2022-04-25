import React from 'react';

const Curator = (props) => {
    const curator_object = props.curator;
    const numFollowers = curator_object.Followers.length;
    const numCollections = curator_object.CreatedCollections.length;
    const numRecommendations = curator_object.RecommendedApps.length;
    return (
        <div>
            <h3>{curator_object.UserName}</h3>
            Followers: {numFollowers}
            Collections: {numCollections}
            Recommendations: {numRecommendations}
        </div>
    );
};

export default Curator;