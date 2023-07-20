import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import Icon from "./Icon";
import Loader from "./Loader";

const SearchBar = () => {
    const [showSearch, setShowSearch] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
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
            setSearchResults(json);
        });
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

    const [showAutocomplete, setShowAutocomplete] = useState(false);

    const [showRecent, setShowRecent] = useState(false);
    const onFocusSearchbar = () => {
        setShowRecent(true);
    }
    const onDefocusSeachbar = () => {
        setShowRecent(false);
        setShowAutocomplete(false);
        setSearchResults([]);
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
                {showAutocomplete ? <AutocompleteSearch showLoader={showLoader} searchResults={searchResults}></AutocompleteSearch> : null}
            </div>
        </div>
    )
}

const AutocompleteSearch = ({ showLoader, searchResults = [] }) => {

    console.log(searchResults);

    return (
        <div className="autocomplete-search">
            <ul role="list" className="search-list">
                {searchResults.map((value, id) => {
                    return (
                        <li>
                            <a href="" className="item">
                                <div>
                                    <img className="profile-picture" src={value.profile.profile_image} alt={value.name} />
                                </div>
                                <div>
                                    <p className="fs-500 fw-medium">{value.name}</p>
                                </div>
                            </a>
                        </li>);
                })}
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
                    {/* change it, only here to check if it works */}
                    {recent.map((value, idx) => (
                        <li>{value}</li>
                    ))}
                </ul> : <p className="fw-regular clr-neutral-500 fs-400">No recent searches</p>}
        </div>

    )
}

export default SearchBar;