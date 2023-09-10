import React from 'react';
import icons from "../../assets/icons.svg";
import svg4everybody from "svg4everybody";

svg4everybody({
    nosvg: true, // shiv <svg> and <use> elements and use image fallbacks
    polyfill: true // polyfill <use> elements for External Content
});

const Icon = ({name}) => {
    return (
        <svg role="img" className="icon">
            <use xlinkHref={icons + "#" + name}></use>
        </svg>
    );
}

export default Icon;
