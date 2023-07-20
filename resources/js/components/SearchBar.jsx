import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import Icon from "./Icon";

const SearchBar = () => {
    const [showSearch, setShowSearch] = useState(false);

    const [searchResults, setSearchResults] = useState(null);

    const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);

    const [searchTerm, setSearchTerm] = useState('');
    const [showLoader, setShowLoader] = useState(true);

    const onSubmit = (e) => {
        e.preventDefault();

        // TODO add searchTerm to recentSearches and to localstorage
        console.log([...recentSearches, searchTerm]);
        setRecentSearches([...recentSearches, searchTerm]);

        fetch(route('search.users', searchTerm)).then(res => {
            return res.json();
        }).then(json => {
            setShowLoader(false);
            setSearchResults(json);
        });
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
        setSearchResults(null);
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
                {showRecent ? <RecentSearch recent={recentSearches} /> : null}
                <SearchRes showLoader={showLoader} searchResults={searchResults}></SearchRes>
            </div>
        </div>
    )
}

const SearchRes = ({ showLoader, searchResults }) => {
    return (
        <div className="autocomplete-search">
            <ul>
                {/* change it, only here to check if it works */}
                {Array.isArray(searchResults) && (
                    <>
                        {searchResults.map((value, idx) => (
                            <li key={idx}><img src={value.profile.profile_image} alt="" style={{ maxHeight: "40px" }} />{value.name}</li>
                        ))}
                    </>
                )}
                {(Array.isArray(searchResults) && searchResults.length == 0) && (
                    <p>No profiles found</p>
                )}
            </ul>
        </div>
    );
}

const RecentSearch = ({ recent }) => {
    return (
        <div className="recent-search">
            <h2 className="fw-bold clr-neutral-500">Recent</h2>
            {recent.length == 0 && (
                <p className="fw-regular clr-neutral-500 fs-400">No recent searches</p>
            )}
            <ul role="list" className="recent">
                {/* recently searched  */}
                {recent.map((value, idx) => (
                    <li>{value}</li>
                ))}
            </ul>
        </div>

    )
}

export default SearchBar;