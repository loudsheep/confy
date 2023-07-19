import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import Icon from "./Icon";

const SearchBar = () => {

    const [showSearch, setShowSearch] = useState(false);

    const [searchResults, setSearchResults] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        fetch(route('search.users', searchTerm)).then(res => {
            return res.json();
        }).then(json => {
            setSearchResults(json);
        })
    };

    const onClickSearch = () => {
        setShowSearch(!showSearch);
    }
    const onBlurSearch = () => {
        setShowSearch(false);
    }

    const [showRecent, setShowRecent] = useState(false);
    const onFocusDisplayRecent = (recent) => {
        setShowRecent(true);
    }
    const onDefocusHideRecent = (recent) => {
        setShowRecent(false);
        setSearchResults([]);
        setSearchTerm('');
    }

    return (
        <div className="search">
            <div className="search-container">
                <button className="search-btn"
                    onClick={onClickSearch}
                    onBlur={onBlurSearch}>
                    {showSearch ? <Icon name="Search_alt_fill"></Icon> : null}
                    {!showSearch ? <Icon name="Search_alt"></Icon> : null}
                </button>
                <form className="searchbar expand" data-expanded={showSearch} onSubmit={onSubmit}>
                    <Icon name="Search_alt"></Icon>
                    <input className="search-input" type="search" placeholder="Search Confy"
                        value={searchTerm}
                        onFocus={onFocusDisplayRecent}
                        onBlur={onDefocusHideRecent}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </form>
            </div>
            <div className="menu">
                {showRecent ? <RecentSearch recent={searchResults} /> : null}

                <div className="autocomplete-search">
                    {/* to be made later */}
                </div>
            </div>
        </div>
    )
}

const RecentSearch = ({ recent }) => {
    return (
        <div className="recent-search">
            <h2 className="fw-bold clr-neutral-500">Recent</h2>
            <p className="fw-regular clr-neutral-500 fs-400">No recent searches</p>
            <ul role="list" className="recent">
                {/* recently searched  */}
                {/* change it, only here to check if it works */}
                {recent.map((value, idx) => (
                    <li key={idx}><img src={value.profile.profile_image} alt="" style={{ maxHeight: "40px" }} />{value.name}</li>
                ))}
            </ul>
        </div>

    )
}

export default SearchBar