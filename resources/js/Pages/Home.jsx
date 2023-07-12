import React, { useState } from 'react';

import Header from "../components/Header";
import SideNav from "../components/SideNav";
import GroupsPanel from "../components/GroupsPanel"; 
import FriendsPanel from "../components/FriendsPanel"; 

const Home = ({ auth, profile }) => {

    //test only
    let groups = [
        {
            id : "2137",
            avatar : "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            name : "Nature",
            link : "https://www.youtube.com/watch?v=_hb0L2t3P3Y&t=1068s"
        }
    ];
    let friends = [
        {
            id : "2137",
            avatar : "https://i.pravatar.cc/300",
            name : "John Doe",
            link : "https://www.youtube.com/watch?v=_hb0L2t3P3Y&t=1068s"
        }
    ];

    return (
        <>
            <Header profile={profile}></Header>
            <div className='content'>
                <section className='left-panel'>
                    <SideNav profile={profile}></SideNav>
                    <GroupsPanel groups={groups}></GroupsPanel>
                </section>
                <main className='main-panel'>

                </main>
                <section className='right-panel'>
                    <FriendsPanel friends={friends}></FriendsPanel>
                </section>
            </div>
        </>
    )
}

export default Home;