import React, { useState } from 'react';

import Header from "../components/Header";

const Home = ({ auth }) => {
    return (
        <>
            {auth.user !== null && "YOU ARE LOGGED IN"}
            <Header></Header>
        </>
    )
}

export default Home