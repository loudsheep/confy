import React, { useState } from 'react';

import Icon from '../Icon';

const Comment = ({ profile, content, time, likes, replies }) => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='comment'>
            <div className="comment-profile">
                <img src={profile.profile.profile_image} alt={profile.name} className="profile-picture" />
                <div className='comment-line'></div>
            </div>
            <div className="comment-content">
                <div className="content">
                    <div className="text">
                        <p className="fs-400 fw-semibold">{`${profile.profile.first_name} ${profile.profile.last_name}`}</p>
                        <div className="comment-text">
                            <p className="fs-500 fw-light">{content}</p>
                        </div>
                    </div>
                    <div className="comment-menu">
                        <button className="comment-menu-btn" onClick={() => console.log("moai 🗿")}>
                            <Icon name="Meatballs_menu"></Icon>
                        </button>
                    </div>
                </div>
                <div className="comment-cta">
                    <span className="fs-400 fw-semibold | span-btn">
                        <Icon name="Favorite"></Icon>
                        {likes}
                    </span>
                    <span className="fs-400 fw-semibold | span-btn">
                        <Icon name="Chat_plus"></Icon>
                        Reply
                    </span>
                    <time className="fs-400 fw-light" dateTime={time}>{new Date(time).toDateString()}</time>
                </div>
                {
                    replies.length > 0 ? (
                        <div className="comment-replies">
                            {!expanded &&
                                <span className="fs-400 fw-semibold | span-btn" onClick={() => setExpanded(true)}>
                                    View {replies.length} {replies.length == 1 ? "reply" : "replies"}
                                </span>
                            }
                            {expanded && replies.map((r) => <Comment
                                profile={r.profile}
                                content={r.text}
                                time={r.time}
                                likes={r.likes}
                                replies={r.replies}
                            ></Comment>)}
                        </div>
                    ) : ""
                }
            </div>
        </div>
    );
}

export default Comment;
