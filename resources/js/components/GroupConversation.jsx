import React from 'react';

import Icon from '@/components/Icon';

const GroupConversationsPanel = ({groups = []}) => {

    const groupsToDisplay = groups.map(g => <Group
        groupId={g.id}
        groupAvatar={g.profile.profile_image}
        groupName={g.name}
        groupActive={Date.now() - Date.parse(g.last_seen) < 5 * 60 * 1000}
        groupLink={"dewde"}
    ></Group>
    );

    return (
        <div className='panel'>
            <h2 className='fw-semibold fs-500 clr-neutral-500 panel-heading'>Group Coversations</h2>
            <ul className='list' role='list'>
                {
                    groups.length != 0 ?
                        groupsToDisplay : null
                }
            </ul>
        </div>
    );
}

const Group = ({ groupId = "-1", groupAvatar = "", groupName = "", groupActive = false }) => {
    return (
        <li key={groupId}>
            <a href={groupLink} className='item'>
                <img className='profile-picture' src={groupAvatar} alt={groupName} />
                <h3 className='fw-medium fs-500 item-name' style={{ color: groupActive ? "lime" : null }}>{friendName}</h3>
            </a>
        </li>
    );
}

export default GroupConversationsPanel;
