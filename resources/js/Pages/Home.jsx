import React, { useState } from 'react';

import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";
import GroupsPanel from "@/components/GroupsPanel"; 
import FriendsPanel from "@/components/FriendsPanel"; 
import GroupConversationsPanel from '@/components/GroupConversation';

const Home = ({ auth, profile, friends, pendingFriendsRequests }) => {

    //test only
    let groups = [
        {
            id : "2137",
            avatar : "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            name : "Nature",
            link : "https://www.youtube.com/watch?v=_hb0L2t3P3Y&t=1068s"
        }
    ];

    console.log(profile, friends, pendingFriendsRequests)


    return (
        <div className='home-page'>
            <Header profile={profile} pendingFriendsRequests={pendingFriendsRequests}></Header>
            <div className='content'>
                <section className='left-panel'>
                    <SideNav profile={profile}></SideNav>
                    <GroupsPanel groups={groups}></GroupsPanel>
                </section>
                <main className='main-panel'>
                    <MobileNav></MobileNav>
                </main>
                <section className='right-panel'>
                    <FriendsPanel friends={friends}></FriendsPanel>
                    <GroupConversationsPanel></GroupConversationsPanel>
                </section>
            </div>
        </div>
    )
}

export default Home;