import React, { useState } from 'react';

import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";
import GroupsPanel from "@/components/GroupsPanel";
import FriendsPanel from "@/components/FriendsPanel";
import UserPost from '@/components/Posts/UserPost';
import GroupConversationsPanel from '@/components/GroupConversation';

const Home = ({ auth, profile, friends, pendingFriendsRequests }) => {

    //test only
    let groups = [
        {
            id: "2137",
            avatar: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            name: "Nature",
            link: "https://www.youtube.com/watch?v=_hb0L2t3P3Y&t=1068s"
        }
    ];

    let posts = [
        {
            profile: friends[0],
            postTime: "2023-02-03T22:41:34Z",
            content: {
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro fugit veritatis quo architecto? Minus, qui velit quibusdam ducimus neque voluptas quis nostrum dolores repudiandae. Sint error ex quos eius explicabo?",
                media: [
                    "https://picsum.photos/1024/1680",
                    "https://picsum.photos/1080/1920",
                    "https://picsum.photos/1920/1680",
                    "https://picsum.photos/1620/1580",
                ]
            },
            likes: 413,
            comments: [
                {
                    profile: friends[1],
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet tellus lectus, non venenatis massa iaculis ac. Maecenas ac tempus.",
                    likes: 45,
                    time: "2023-03-28T18:28:58Z",
                    replies: [
                        {
                            profile: friends[2],
                            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                            likes: 12,
                            time: "2023-04-10T17:36:10Z",
                            replies: [
                                {
                                    profile: friends[3],
                                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                                    likes: 17,
                                    time: "2023-04-27T02:18:45Z",
                                    replies: [

                                    ]
                                }
                            ]
                        },
                        {
                            profile: friends[3],
                            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                            likes: 17,
                            time: "2023-04-27T02:18:45Z",
                            replies: [

                            ]
                        }
                    ]
                },
                {
                    profile: friends[1],
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet tellus lectus, non venenatis massa iaculis ac. Maecenas ac tempus.",
                    likes: 45,
                    time: "2023-03-28T18:28:58Z",
                    replies: [
                        {
                            profile: friends[2],
                            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                            likes: 12,
                            time: "2023-04-10T17:36:10Z",
                            replies: [
                                {
                                    profile: friends[3],
                                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                                    likes: 17,
                                    time: "2023-04-27T02:18:45Z",
                                    replies: [

                                    ]
                                },
                                {
                                    profile: friends[3],
                                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                                    likes: 17,
                                    time: "2023-04-27T02:18:45Z",
                                    replies: [

                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    profile: friends[1],
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet tellus lectus, non venenatis massa iaculis ac. Maecenas ac tempus.",
                    likes: 45,
                    time: "2023-03-28T18:28:58Z",
                    replies: [
                        {
                            profile: friends[2],
                            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                            likes: 12,
                            time: "2023-04-10T17:36:10Z",
                            replies: [
                                {
                                    profile: friends[3],
                                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
                                    likes: 17,
                                    time: "2023-04-27T02:18:45Z",
                                    replies: [

                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    let postDisplay = posts.map(p =>
        <UserPost
            user={profile}
            profile={p.profile}
            postTime={p.postTime}
            content={p.content}
            likes={p.likes}
            comments={p.comments}
        ></UserPost>
    );

    // console.log(profile, friends, pendingFriendsRequests)

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
                    {postDisplay}
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