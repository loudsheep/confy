import React, { useState } from "react";

import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import Menus from "../components/Menus";

const Header = () => {

    const [showSearchBar, setShowSearchBar] = useState(true);

    window.onresize = () => {

    }

    return (
        <header className="primary-header columns">
            <Logo></Logo>
            {showSearchBar ? <SearchBar></SearchBar> : null}
            <Menus></Menus>
        </header>
    )
}   

export default Header