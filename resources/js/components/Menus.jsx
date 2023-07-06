import React, { useState } from "react";

//icons
import icons from "../../assets/icons.svg";

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
            <button onClick={onClickNotifications}>
                <svg className="icon">
                    <use xlinkHref={icons + "#Bell"}></use>
                </svg>
            </button>
            <button onClick={onClickProfile}>
                <img className="profile-picture" src="https://i.pravatar.cc/300" alt="Profile Image" />
                <div>

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
                    </button>
                    <button>
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
                <p>Kyra Diaz</p>
            </div>
            <div>
                {/* spacer */}
            </div>
            <div>
                <p>Settings</p>
            </div>
            <div>
                <p>Help & Support</p>
            </div>
            <div>
                <p>Log out</p>
            </div>
        </div>
    )
}

export default Menus;

