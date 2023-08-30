import React, { useState } from "react";

import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Menus from "../components/Menus";

const Header = ({ profile, pendingFriendsRequests }) => {
    return (
        <header className="primary-header | box-shadow">
            <Logo></Logo>
            <SearchBar></SearchBar>
            <Menus profile={profile} pendingFriendsRequests={pendingFriendsRequests}></Menus>
        </header>
    )
}

export default Header