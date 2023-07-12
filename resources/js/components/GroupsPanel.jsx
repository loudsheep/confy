import React, { useState } from 'react';

import Icon from "../components/Icon";

const GroupsPanel = ({ groups = [] }) => {

    const groupsToDisplay = groups.map(g => <Group 
        groupId={g.id} 
        groupAvatar={g.avatar}
        groupName={g.name}
        groupLink={g.link}
        ></Group>
    );

    return (
        <div className='groups-panel'>
            <h2 className='fw-semibold fs-500 clr-neutral-500 panel-heading'>Groups</h2>
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


const Group = ({ groupId = "-1", groupAvatar = "", groupName ="", groupLink = ""}) => {
    return (
        <li key={groupId}>
            <a href={groupLink} className='group'>
                <img className='profile-picture' src={groupAvatar} alt={groupName} />
                <h3 className='fw-medium fs-500 group-name'>{groupName}</h3>
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