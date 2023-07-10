import React, { useState } from "react"
import Icon from "./Icon";

const SearchBar = () => {

    const [showSearch, setShowSearch] = useState(false);

    const [showRecent, setShowRecent] = useState(false);

    const onFocusDisplayRecent = (recent) => {
        setShowRecent(true);
    }
    const onDefocusHideRecent = (recent) => {
        setShowRecent(false);
    }

    return (
        <div className="search">
            {/* small only */}
            <button className="search-btn" style={{display: "none"}}>
                {showSearch ? <Icon name="Search_alt"></Icon> : null}
                {!showSearch ? <Icon name="Search_alt"></Icon> : null}
            </button>

            <div className="searchbar">
                <Icon name="Search_alt"></Icon>
                <input className="search-input" type="search" placeholder="Search Confy"
                    onFocus={onFocusDisplayRecent}
                    onBlur={onDefocusHideRecent} />
            </div>
            <div className="menu">
                {showRecent ? <RecentSearch /> : null}
                <div className="autocomplete-search">
                    {/* to be made later */}
                </div>
            </div>
        </div>
    )
}

const RecentSearch = () => {
    return (
        <div className="recent-search">
            <h2 className="fw-bold clr-neutral-500">Recent</h2>
            <p className="fw-regular clr-neutral-500 fs-400">No recent searches</p>
            <ul role="list" className="recent">
                {/* recently searched  */}
            </ul>
        </div>

    )
}

export default SearchBar