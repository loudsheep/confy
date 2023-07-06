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
            <button className="notifications" onClick={onClickNotifications}>
                <Icon name="Bell"></Icon>
            </button>
            <button className="profile" onClick={onClickProfile}>
                <img className="profile-picture" src="https://i.pravatar.cc/300" alt="Profile Image" />
                <div className="expand-down">
                    <Icon name="Expand_down"></Icon>
                </div>
            </button>
            <div>
                {showNotifications ? <Notifications></Notifications> : null}
                {showProfile ? <ProfileSettings></ProfileSettings> : null}
            </div>
        </div>
    )
}

const Notifications = () => {
    return (
        <section>
            <div>
                <h1 className="fw-bold">Notifications</h1>
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
        <div className="profile-settings | fw-semibold">
            <div>
                <img className="profile-picture" src="https://i.pravatar.cc/300" alt="Profile Image" />
                <p>Name Surname</p>
            </div>
            <div>
                {/* spacer */}
            </div>
            <button>
                <Icon name="Setting_line"></Icon>
                <p>Settings</p>
            </button>
            <button>
                <Icon name="Question"></Icon>
                <p>Help & Support</p>
            </button>
            <button>
                <Icon name="Sign_out_squre"></Icon>
                <p>Log out</p>
            </button>
        </div>
    )
}

export default Menus;

