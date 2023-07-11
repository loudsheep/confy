import React, { useState } from "react";

import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Menus from "../components/Menus";

const Header = ({ username }) => {
    return (
        <header className="primary-header columns">
            <Logo></Logo>
            <SearchBar></SearchBar>
            <Menus username={username}></Menus>
        </header>
    )
}

export default Header