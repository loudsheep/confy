import React, { useState } from 'react';

import Icon from "../components/Icon";

const FriendsPanel = ({ friends = [] }) => {

    const friendsToDisplay = friends.map(f => <Friend
        friendId={f.id}
        friendAvatar={f.avatar}
        friendName={f.name}
        friendLink={f.link}
    ></Friend>
    );

    return (
        <div className='friends-panel'>
            <h2 className='fw-semibold fs-500 clr-neutral-500 panel-heading'>Friends</h2>
            <ul className='friends-list' role='list'>
                {
                    friends.length != 0 ?
                        friendsToDisplay :
                        <NoFriends></NoFriends>
                }
            </ul>
        </div>
    );
}


const Friend = ({ friendId = "-1", friendAvatar = "", friendName = "", friendLink = "" }) => {
    return (
        <li key={friendId}>
            <a href={friendLink} className='friend'>
                <img className='profile-picture' src={friendAvatar} alt={friendName} />
                <h3 className='fw-medium fs-500 friend-name'>{friendName}</h3>
            </a>
        </li>
    );
}

const NoFriends = () => {
    return (
        <div className='no-friends'>
            <Icon name="Group"></Icon>
            <p className='fw-semibold fs-400 clr-neutral-500'>Friendless??</p>
        </div>
    );
}

export default FriendsPanel;

