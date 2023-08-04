import React, { useState } from 'react';

import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";
import GroupsPanel from "@/components/GroupsPanel";
import FriendsPanel from "@/components/FriendsPanel";
import GroupConversationsPanel from '@/components/GroupConversation';

const Profile = ({ auth, profile, friends, pendingFriendsRequests }) => {
    //test only
    let groups = [
        {
            id: "2137",
            avatar: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            name: "Nature",
            link: "https://www.youtube.com/watch?v=_hb0L2t3P3Y&t=1068s"
        }
    ];

    let friendsDisplay = friends.map((f) =>
        <img className='friend-profile' src={f.profile.profile_image} alt={f.name} />
    ).slice(0, 6);


    console.log(friendsDisplay);

    return (
        <div className='profile-page'>
            <Header profile={profile} pendingFriendsRequests={pendingFriendsRequests}></Header>
            <div className='content'>
                <section className='left-panel'>
                    <SideNav profile={profile}></SideNav>
                    <GroupsPanel groups={groups}></GroupsPanel>
                </section>
                <main className='main-panel'>
                    <MobileNav></MobileNav>
                    <div className='profile'>
                        <div className='profile-top'>
                            <div className="profile-cover">
                                <img src="https://images.unsplash.com/photo-1605423357383-8d9345d6d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" alt="" className="cover-image" />
                                <img src="https://i.pravatar.cc/300" alt="" className="profile-image" />
                            </div>
                            <div className="profile-description">
                                <div className="info">
                                    <h1 className="fs-900 fw-semibold">{profile.first_name + " " + profile.last_name}</h1>
                                    <a href='' className="link">{friends.length} Friends</a>
                                    <div className="friends-display">
                                        {friendsDisplay}
                                    </div>
                                </div>
                                <div className="actions">

                                </div>
                            </div>
                        </div>
                        <div className="profile-nav">
                            Lorem ipsum dolor sit amet.
                        </div>
                        <div className="profile-content">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, commodi?
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile;