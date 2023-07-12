import React, { useState } from "react";

import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Menus from "../components/Menus";

const Header = ({ profile }) => {
    return (
        <header className="primary-header">
            <Logo></Logo>
            <SearchBar></SearchBar>
            <Menus profile={profile}></Menus>
        </header>
    )
}

export default Header