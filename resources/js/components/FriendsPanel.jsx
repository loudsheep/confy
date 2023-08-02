import React, { useState } from 'react';

import Icon from "../components/Icon";

const FriendsPanel = ({ friends = [] }) => {


    // this checks when friend has last updated its active status,
    // if it is below 5 minutes ago then a friend is considered active
    const friendsToDisplay = friends.map((f, idx) => <Friend
        key={idx}
        friendId={f.id}
        friendAvatar={f.profile.profile_image}
        friendName={f.profile.first_name + " " + f.profile.last_name}
        friendActive={Date.now() - Date.parse(f.last_seen) < 5 * 60 * 1000}
        friendLink={"dewde"}
    ></Friend>
    );

    friendsToDisplay.sort(function (x, y) {
        return (x === y)? 0 : x? -1 : 1;
    })

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


const Friend = ({ friendId = "-1", friendAvatar = "", friendName = "", friendActive = false }) => {
    return (
        <li key={friendId}>
            <button className='item'>
                <div className='friend-display'>
                    <img className='profile-picture' src={friendAvatar} alt={friendName} />
                    <div className={`${friendActive ? "active" : "a"}`}></div>
                </div>
                <h3 className='fw-medium fs-500 item-name'>{friendName}</h3>
            </button>
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

