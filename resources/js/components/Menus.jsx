import React, { useState } from "react";

import Icon from "../components/Icon";

const Menus = () => {

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

    return (
        <div>
            <div className="profile-notifications">
                <button className="notifications-btn" onClick={onClickNotifications}>
                    <Icon name="Bell"></Icon>
                </button>
                <button className="profile" onClick={onClickProfile}>
                    <img className="profile-picture" src="https://i.pravatar.cc/300" alt="Profile Image" />
                    <div className="expand-down">
                        <Icon name="Expand_down"></Icon>
                    </div>
                </button>
            </div>
            {showNotifications ? <Notifications></Notifications> : null}
            {showProfile ? <ProfileSettings></ProfileSettings> : null}
        </div>
    )
}

const Notifications = () => {
    return (
        <section className="notifications menu">
            <div>
                <h2 className="fw-bold clr-neutral-500">Notifications</h2>
                <div>
                    <button>
                        <Icon name="Filter_alt"></Icon>
                    </button>
                    <button>
                        <Icon name="Meatballs_menu"></Icon>
                    </button>
                </div>
            </div>
            <ul role="list" aria-label="Notifications">
                {/* notifications */}
            </ul>
        </section>
    )
}

const ProfileSettings = () => {
    return (
        <div className="profile-settings menu | fw-semibold">
            <a href="#">
                <img className="profile-picture" src="https://i.pravatar.cc/300" alt="Profile Image" />
                <p>Name Surname</p>
            </a>
            <div className="line"></div>
            <a href="#">
                <Icon name="Setting_line"></Icon>
                <p>Settings</p>
            </a>
            <a href="#">
                <Icon name="Question"></Icon>
                <p>Help & Support</p>
            </a>
            <a href="#">
                <Icon name="Sign_out_squre"></Icon>
                <p>Log out</p>
            </a>
        </div>
    )
}

export default Menus;

