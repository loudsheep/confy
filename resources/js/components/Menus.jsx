import React, { useState } from "react";

import Notifications from "../components/Notifcations";
import Icon from "../components/Icon";

const Menus = ({ profile, pendingFriendsRequests }) => {
    
    //show and hide notifications
    const [showNotifications, setShowNotifications] = useState(false);
    const onClickNotifications = () => {
        setShowProfile(false);
        setShowNotifications(!showNotifications);
    };
    //show and hide profile & settings
    const [showProfile, setShowProfile] = useState(false);
    const onClickProfile = () => {
        setShowNotifications(false);
        setShowProfile(!showProfile);
    };
    const onBlurProfile = () => {
        setShowProfile(!showProfile);
    };
    

    return (
        <div className="header-menus">
            <div className="pn-dropdown">
                <button className="notifications-btn"
                    onClick={onClickNotifications}>
                    {showNotifications ? <Icon name="Bell_fill"></Icon> : null}
                    {!showNotifications ? <Icon name="Bell"></Icon> : null}
                </button>
                <button className="profile"
                    onClick={onClickProfile}>
                    <img className="profile-picture" src={profile.profile_image} alt="Profile Image" />
                    <div className="expand">
                        <Icon name={"Expand_down"}></Icon>
                    </div>
                </button>
            </div>
            <div className="menu">
                {showNotifications ? <Notifications pendingFriendsRequests={pendingFriendsRequests}></Notifications> : null}
                {showProfile ? <ProfileSettings profile={profile}></ProfileSettings> : null}
            </div>
        </div>
    )
}

const ProfileSettings = ({ profile }) => {
    return (
        <div className="profile-settings | box-shadow fw-semibold" id="profile-menu" autoFocus>
            <a href={route("profile", profile.id)} className="menu-item">
                <img className="profile-picture" src={profile.profile_image} alt="Profile Image" />
                <p id="username" aria-description="username">{profile.first_name + " " + profile.last_name}</p>
            </a>
            <div className="line"></div>
            <a href="#" className="menu-item">
                <Icon name="Setting_line"></Icon>
                <p>Settings</p>
            </a>
            <a href="#" className="menu-item">
                <Icon name="Question"></Icon>
                <p>Help & Support</p>
            </a>
            <a href={route('logout')} className="menu-item">
                <Icon name="Sign_out_squre"></Icon>
                <p>Log out</p>
            </a>
        </div>
    )
}

export default Menus;

