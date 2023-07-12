import React, { useState } from 'react';

import Icon from "../components/Icon";

const GroupsPanel = ({ groups = [] }) => {

    let groupsToDisplay = [];

    groupsToDisplay = groups.map(g => {
        return Group(
            g.id,
            g.avatar,
            g.name,
            g.link
        );
    })

    console.log(groupsToDisplay);

    return (
        <div className='groups-panel'>
            <h2 className='fw-semibold fs-500 clr-neutral-500'>Groups</h2>
            <ul className='groups-list' role='list'>
                {
                    groups.length != 0 ?
                        groupsToDisplay :
                        <NoGroups></NoGroups>
                }
            </ul>
        </div>
    );
}


const Group = ({ groupId }, { groupAvatar }, { groupName }, { groupLink }) => {
    return (
        <li key={groupId} className='group'>
            <a href={groupLink}>
                <img className='profile-picture' src={groupAvatar} alt="" />
                <h3 className='fw-medium fs-500'>{groupName}</h3>
            </a>
        </li>
    );
}

const NoGroups = () => {
    return (
        <div className='no-groups'>
            <Icon name="Group"></Icon>
            <p className='fw-semibold fs-400 clr-neutral-500'>You're not part of any group right now.</p>
        </div>
    );
}

export default GroupsPanel;