import React, { useState } from "react"
import logo_full from '../../assets/logo.svg'
import logo_icon from '../../assets/logo-icon.svg'

const Logo = () => {
    return (
        <div>
            <a href="/">
                <img className="logo" data-type="full" src={logo_full} alt="Confy" />
                <img className="logo" data-type="icon" src={logo_icon} alt="Confy" />
            </a>
        </div>
    )
}

export default Logo