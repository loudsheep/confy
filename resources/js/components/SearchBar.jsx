import React from "react"
import Icon from "./Icon";

const SearchBar = () => {
    return (
        <div className="search">
            <div className="searchbar">
                <Icon name="Search_alt"></Icon>
                <input className="search-input" type="search" placeholder="Search Confy" />
            </div>
            <div className="recent-search">
                
            </div>
        </div>
    )
}

export default SearchBar