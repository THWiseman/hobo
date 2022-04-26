import React from 'react';
import User from './user'

const UserList = (props) => {
    const userIdArray = props.userIdArray;

    return (
        <div>
            <ul className={"list-group"}>
            {userIdArray?.map(u => <User userId={u}/>)}
            </ul>
        </div>
    );
};

export default UserList;