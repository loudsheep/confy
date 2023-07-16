import React, { useState } from 'react';

import Icon from "../components/Icon";

const FriendsPanel = ({ friends = [] }) => {


    // this checks when friend has last updated its active status,
    // if it is below 5 minutes ago then a friend is considered active
    const friendsToDisplay = friends.map(f => <Friend
        friendId={f.id}
        friendAvatar={f.profile.profile_image}
        friendName={f.name}
        friendActive={Date.now() - Date.parse(f.last_seen) < 5 * 60 * 1000}
        friendLink={"dewde"}
    ></Friend>
    );

    return (
        <div className='panel'>
            <h2 className='fw-semibold fs-500 clr-neutral-500 panel-heading'>Friends</h2>
            <ul className='list' role='list'>
                {
                    friends.length != 0 ?
                        friendsToDisplay :
                        <NoFriends></NoFriends>
                }
            </ul>
        </div>
    );
}


const Friend = ({ friendId = "-1", friendAvatar = "", friendName = "", friendLink = "", friendActive = false }) => {
    return (
        <li key={friendId}>
            <a href={friendLink} className='item'>
                <img className='profile-picture' src={friendAvatar} alt={friendName} />
                <h3 className='fw-medium fs-500 item-name' style={{ color: friendActive ? "lime" : null }}>{friendName}</h3>
            </a>
        </li>
    );
}

const NoFriends = () => {
    return (
        <div className='no-items'>
            <Icon name="Group"></Icon>
            <p className='fw-semibold fs-400 clr-neutral-500'>Friendless??</p>
        </div>
    );
}

export default FriendsPanel;

