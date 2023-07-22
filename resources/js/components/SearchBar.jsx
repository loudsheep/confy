import React, { useState } from "react";
import { Link, useForm } from '@inertiajs/react';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { router } from '@inertiajs/react'
import Icon from "./Icon";
import Loader from "./Loader";
import { useRecentSearches } from "@/Hooks/useRecentSearches";

const SearchBar = () => {
    const [showSearch, setShowSearch] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, addRecentSearch] = useRecentSearches();

    const [searchTerm, setSearchTerm] = useState('');
    const [showLoader, setShowLoader] = useState(true);

    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [showRecent, setShowRecent] = useState(false);

    const addToRecentHistory = () => {
        addRecentSearch(searchTerm);
    };

    const onChange = (e) => {
        setShowRecent(false);
        setShowAutocomplete(true);

        setShowLoader(true);
        setSearchTerm(e.target.value);

        fetch(route('search.users', e.target.value)).then(res => {
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

    const onFocusSearchbar = (e) => {
        if (!e.target.value) {
            setShowRecent(true);
        } else {
            setShowAutocomplete(true);
            // onChange(e);
        }
    }
    const onDefocusSeachbar = () => {
        setShowRecent(false);
        setShowAutocomplete(false);
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
                <form className="searchbar expand" data-expanded={showSearch}>
                    <Icon name="Search_alt"></Icon>
                    <input className="search-input" type="search" placeholder="Search Confy"
                        value={searchTerm}
                        onFocus={onFocusSearchbar}
                        onBlur={onDefocusSeachbar}
                        onChange={onChange} />
                </form>
            </div>
            <div className="menu">
                {showRecent ? <RecentSearch recent={recentSearches} /> : null}
                {showAutocomplete ? <AutocompleteSearch showLoader={showLoader} searchResults={searchResults} addToRecentHistory={addToRecentHistory}></AutocompleteSearch> : null}
            </div>
        </div>
    )
}

const AutocompleteSearch = ({ showLoader, searchResults = [], addToRecentHistory }) => {

    const onClick = (event, id) => {
        event.preventDefault();

        addToRecentHistory();
        router.post(route('invite.friend', id));
    };

    return (
        <div className="autocomplete-search">
            <ul role="list" className="search-list">
                {searchResults.map((value, id) =>
                    <li key={id}>
                        <div className="item" onMouseDown={(e) => onClick(e, value.id)}>
                            <div>
                                <img className="profile-picture" src={value.profile.profile_image} alt={value.name} />
                            </div>
                            <div>
                                <p className="fs-500 fw-medium clr-neutral-900">{value.name}</p>
                            </div>
                        </div>
                    </li>
                )}
                {searchResults.length == 0 && (
                    <p>No results</p>
                )}
            </ul>
        </div>
    );
}

const RecentSearch = ({ recent = [] }) => {
    return (
        <div className="recent-search">
            <h2 className="fw-bold clr-neutral-500">Recent</h2>
            {recent.length != 0 ?
                <ul role="list" className="recent">
                    {/* recently searched  */}
                    {recent.map((value, idx) => (
                        <li key={idx}>{value}</li>
                    ))}
                </ul> : <p className="fw-regular clr-neutral-500 fs-400">No recent searches</p>}
        </div>

    )
}

export default SearchBar;