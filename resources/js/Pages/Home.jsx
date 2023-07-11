import React, { useState } from 'react';

import Header from "../components/Header";

const Home = ({ auth }) => {
    return (
        <>
            <Header username={auth.user.name}></Header>
        </>
    )
}

export default Home;