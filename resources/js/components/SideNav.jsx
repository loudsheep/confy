import React from 'react';

import Icon from '../components/Icon';

const SideNav = ({profile}) => {

    let isProfile = location.pathname.includes("/profile");

    return (
        <div className='side-nav | box-shadow'>
            <ul className='nav' role='list'>
                <li>
                    <a href="/" className={`nav-item ${!isProfile ? "active" : ""}`}>
                        <Icon name="Home"></Icon>
                        <h2 className='fw-semibold fs-500 | nav-item-header'>Home</h2>
                    </a>
                </li>
                <li>
                    <a href={route('profile', profile.id)} className={`nav-item ${isProfile ? "active" : ""}`}>
                        <img className='profile-picture' src={profile.profile_image} alt="" />
                        <h2 className='fw-semibold fs-500 | nav-item-header'>{profile.first_name + " " + profile.last_name}</h2>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideNav;
