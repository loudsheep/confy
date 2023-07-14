import React from 'react';

import Icon from "../components/Icon";

const MobileNav = () => {

    //toggle active class based on route
    //and change icon to filled version

    return (
        <div className='mobile-nav'>
            <a href="" id='groups' className='nav-item'>
                <Icon name="Group"></Icon>
            </a>
            <a href="/" id='home' className='nav-item active'>
                <Icon name="Home_fill"></Icon>
            </a>
            <a href="" id='friends' className='nav-item'>
                <Icon name="User_alt"></Icon>
            </a>
        </div>
    );
}

export default MobileNav;
