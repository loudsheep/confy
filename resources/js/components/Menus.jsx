import React, { useState } from "react";

import Icon from "../components/Icon";
import MobileSearchBar from "../components/SearchBar";

const Menus = ({ username }) => {

    //show and hide search
    const [showSearch, setShowSearch] = useState(false);
    const onClickSearch = () => {
        setShowProfile(false);
        setShowNotifications(false);
        setShowSearch(!showSearch);
    }
    //show and hide notifications
    const [showNotifications, setShowNotifications] = useState(false);
    const onClickNotifications = () => {
        setShowProfile(false);
        setShowSearch(false);
        setShowNotifications(!showNotifications);
    };
    //show and hide profile & settings
    const [showProfile, setShowProfile] = useState(false);
    const onClickProfile = () => {
        setShowNotifications(false);
        setShowSearch(false);
        setShowProfile(!showProfile);
    };

    return (
        <div className="header-menus flex" style={{ "--gap-size": "var(--size-300)" }}>
            <button className="search-btn"
                onClick={onClickSearch}>
                {showSearch ? <Icon name="Search_alt"></Icon> : null}
                {!showSearch ? <Icon name="Search_alt"></Icon> : null}
            </button>
            <div className="pn-dropdown">
                <button className="notifications-btn"
                    onClick={onClickNotifications}>
                    {showNotifications ? <Icon name="Bell_fill"></Icon> : null}
                    {!showNotifications ? <Icon name="Bell"></Icon> : null}
                </button>
                <button className="profile"
                    onClick={onClickProfile}>
                    <img className="profile-picture" src="https://i.pravatar.cc/300" alt="Profile Image" />
                    <div className="expand">
                        <Icon name={"Expand_down"}></Icon>
                    </div>
                </button>
            </div>
            <div className="menu">
                {showNotifications ? <Notifications></Notifications> : null}
                {showProfile ? <ProfileSettings username={username}></ProfileSettings> : null}
                {showSearch ? <MobileSearchBar></MobileSearchBar> : null}
            </div>
        </div>
    )
}

const Notifications = () => {
    return (
        <section className="notifications">
            <div className="notifications-heading">
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
                <NoNotifications />
                {/* notifications */}
            </ul>
        </section>
    )
}

const NoNotifications = () => {
    return (
        <div className="no-notifications">
            <Icon name="Bell"></Icon>
            <p className="fw-bold clr-neutral-500">You have no notifications</p>
        </div>
    );
}

const ProfileSettings = ({ username }) => {
    return (
        <div className="profile-settings | fw-semibold">
            <a href="#" className="menu-item">
                <img className="profile-picture" src="https://i.pravatar.cc/300" alt="Profile Image" />
                <p>{username}</p>
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

