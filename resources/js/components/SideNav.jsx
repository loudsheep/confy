import React from 'react';

import Icon from '../components/Icon';

const SideNav = ({profile}) => {
    return (
        <div className='side-nav'>
            <ul className='nav' role='list'>
                <li>
                    <a href="/" className='nav-item active'>
                        <Icon name="Home"></Icon>
                        <h2 className='fw-semibold fs-500 | nav-item-header'>Home</h2>
                    </a>
                </li>
                <li>
                    <a href="" className='nav-item'>
                        <img className='profile-picture' src={profile.profile_image} alt="" />
                        <h2 className='fw-semibold fs-500 | nav-item-header'>{profile.first_name + " " + profile.last_name}</h2>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideNav;
