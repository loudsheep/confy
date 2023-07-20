import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import Icon from "./Icon";
import Loader from "./Loader";

const SearchBar = () => {

    const [showSearch, setShowSearch] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [showLoader, setShowLoader] = useState(true);


    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     fetch(route('search.users', searchTerm)).then(res => {
    //         return res.json();
    //     }).then(json => {
    //         setSearchResults(json);
    //     });  
    // };

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
        })

    }

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
                {showRecent ? <RecentSearch /> : null}
                {showAutocomplete ? <AutocompleteSearch showLoader={showLoader} searchResults={searchResults}></AutocompleteSearch> : null}
            </div>
        </div>
    )
}

const AutocompleteSearch = ({ showLoader, searchResults }) => {
    return (
        <div className="autocomplete-search">
            <ul role="list" className="search-list">
                {searchResults.map((value, id) => {
                    <li key={id}>
                        <a href="" className="item">
                            <div>
                                <img src={value.profile.profile_image} alt={value.name} />
                            </div>
                            <div>
                                <p className="fs-500 fw-medium">{value.name}</p>
                            </div>
                        </a>
                    </li>
                })}
            </ul>
        </div>
    );
}

const RecentSearch = ({ recent = []}) => {
    return (
        <div className="recent-search">
            <h2 className="fw-bold clr-neutral-500">Recent</h2>
            {recent.length != 0 ? <ul role="list" className="recent">
                {recent.map((value, idx) => (
                    <li key={idx}><img src={value.profile.profile_image} alt="" style={{ maxHeight: "40px" }} />{value.name}</li>
                ))}
            </ul> : <p className="fw-regular clr-neutral-500 fs-400">No recent searches</p>
            }

        </div>

    )
}

export default SearchBar;