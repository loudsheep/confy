import React, { useState } from 'react';

import Icon from '@/components/Icon';

const Dropdown = ({ name = "", options = [] }) => {

    const [display, setDisplay] = useState(name.charAt(0).toUpperCase() + name.toLowerCase().slice(1));
    let localName = name.toLowerCase();

    let id = localName + "-dropdown";

    const [value, setValue] = useState("");
    const [expanded, setExpanded] = useState(false);

    const setDropdownValue = (e) => {
        setValue(e.target.getAttribute("data-value"));
        setDisplay(e.target.getAttribute("data-value"));
    }

    const expandMenu = (e) => {
        e.preventDefault();
        setExpanded(!expanded);
    }

    const onBlur = (e) => {
        if (!e.target.classList.contains("dropdown")) {
            setExpanded(false);
        }
    }

    let generateOptions = options.map((o, id) => (
        <li key={id} tabIndex={id} className="dropdown-item" data-value={o} onClick={(e) => setDropdownValue(e)}>
            {o}
        </li>
    ));

    return (
        <div className='dropdown-wrapper' onMouseLeave={(e) => onBlur(e)}>
            <input type="hidden" name={localName} id={localName} value={value} />
            <button className='dropdown' onClick={expandMenu} aria-controls={id}>
                <p className='dropdown-value | fs-400 fw-medium'>{display}</p>
                {expanded ? <Icon name="Expand_up"></Icon> : null}
                {!expanded ? <Icon name="Expand_down"></Icon> : null}
            </button>
            <div className='dropdown-menu' data-expanded={expanded} aria-expanded={expanded} id={id}>
                <ul className='dropdown-list'>
                    {generateOptions}
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;
