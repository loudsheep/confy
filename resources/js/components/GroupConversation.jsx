import React from 'react';

import Icon from '@/components/Icon';

const GroupConversationsPanel = ({ groups = [] }) => {

    const groupsToDisplay = groups.map(g => <Group
        groupId={g.id}
        groupAvatar={g.profile.profile_image}
        groupName={g.name}
        groupActive={Date.now() - Date.parse(g.last_seen) < 5 * 60 * 1000}
        groupLink={"dewde"}
    ></Group>
    );

    return (
        <div className='panel | box-shadow'>
            <h2 className='fw-semibold fs-500 clr-neutral-500 panel-heading'>Group Coversations</h2>
            <ul className='list' role='list'>
                {
                    groups.length != 0 ?
                        groupsToDisplay : null
                }
                <li>
                    <button id='create-new-group' className='create-new-group-btn item'>
                        <div className='add-new'>
                            <Icon name="Add_round"></Icon>
                        </div>
                        <h3 className='fw-medium fs-500 item-name'>Create New Group</h3>
                    </button>
                </li>
            </ul>
        </div>
    );
}

const Group = ({ groupId = "-1", groupAvatar = "", groupName = "", groupActive = false }) => {
    return (
        <li key={groupId}>
            <button className='item'>
                <div>
                    <img className='profile-picture' src={groupAvatar} alt={groupName} />
                    
                </div>
                <h3 className='fw-medium fs-500 item-name' style={{ color: groupActive ? "lime" : null }}>{groupName}</h3>
            </button>
        </li>
    );
}

export default GroupConversationsPanel;
