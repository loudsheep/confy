import React, { useState } from "react";

import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Menus from "../components/Menus";

const Header = () => {
    return (
        <header className="primary-header columns">
            <Logo></Logo>
            <SearchBar></SearchBar>
            <Menus></Menus>
        </header>
    )
}   

export default Header