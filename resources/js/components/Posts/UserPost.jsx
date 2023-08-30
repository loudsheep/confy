import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";

import Icon from '../Icon';
import EmojiPicker from '../EmojiPicker';

// - profile -> user that created post
// - postTime -> time when post was created
// - content -> {
//     - text -> post text
//     - media -> post media
// }
// - likes -> ammount of likes
// - comments -> comments tree with comments and replies

const UserPost = ({ user, profile, postTime, content, likes, comments }) => {


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    let time = new Date(postTime);

    let media = content.media.map((m, id) =>
        <div key={id} className="media-wrapper">
            <img className="media-image-bg" src={m} />
            <img className="media-image" src={m} />
        </div>
    )

    const commentInp = useRef(null);
    const focusComment = () => {
        commentInp.current.focus();
    }

    const addEmoji = (emoji) => {
        commentInp.current.focus();
        let pointer = commentInp.current.selectionStart;
        let value = commentInp.current.value;

        let out = value.slice(0, pointer) + emoji.native + value.slice(pointer);
        
        commentInp.current.value = out;
    };


    const [focused, setFocused] = useState(false);
    const focusPost = () => {
        setFocused(true);
    };

    return (
        <article className="post | box-shadow">
            <header className="post-header">
                <div className="profile">
                    <img src="https://i.pravatar.cc/300" alt="" className="profile-picture" />
                    <div>
                        <p className="fw-medium fs-500">Mya Wynn</p>
                        <time className="fs-300 fw-light" dateTime={postTime}>{time.toDateString()}</time>
                    </div>
                </div>
                <div className="post-menu">
                    <button className="menu-btn">
                        <Icon name="Meatballs_menu"></Icon>
                    </button>
                    <button className="menu-btn">
                        <Icon name="Close_round"></Icon>
                    </button>
                </div>
            </header>
            <section className="post-content">
                <div className="post-text">
                    <p className="fs-500 fw-light">{content.text}</p>
                </div>
                <div className="post-media">
                    <Slider {...sliderSettings}>
                        {media}
                    </Slider>
                </div>
            </section>
            <div className="post-cta">
                <button className="btn">
                    <Icon name="Favorite"></Icon>
                    <p className="text">{likes != 0 ? likes : "Like"}</p>
                </button>
                <button className="btn" onClick={() => focusComment()}>
                    <Icon name="Comment"></Icon>
                    <p className="text">Comment</p>
                </button>
                <button className="btn">
                    <Icon name="Send"></Icon>
                    <p className="text">Share</p>
                </button>
            </div>
            <section className="post-comments">
                <form className="post-comments-cta">
                    <img src={user.profile_image} alt={`${user.first_name} ${user.last_name}`} className="profile-picture" />
                    <div className="input">
                        <input ref={commentInp} id="comment-input" type="text" autoComplete="off" placeholder="Write a comment..." />
                        <EmojiPicker onEmojiSelect={(emoji) => addEmoji(emoji)}></EmojiPicker>
                        <button className="input-btn" type="submit">
                            <Icon name="Send_hor"></Icon>
                        </button>
                    </div>
                </form>
                {
                    comments.length != 0 ? (
                        <div className="comment">
                            <div className="comment-profile">
                                <img src="https://i.pravatar.cc/300" alt="" className="profile-picture" />
                            </div>
                            <div className="comment-content">
                                <div className="content">
                                    <div className="text">
                                        <p className="fs-400 fw-semibold">Alex Butler</p>
                                        <div className="comment-text">
                                            <p className="fs-500 fw-light">{comments[0].text}</p>
                                        </div>
                                    </div>
                                    <div className="comment-menu">
                                        <button className="comment-menu-btn" onClick={()=>console.log("moai 🗿")}>
                                            <Icon name="Meatballs_menu"></Icon>
                                        </button>
                                    </div>
                                </div>
                                <div className="comment-cta">
                                    <span className="fs-400 fw-semibold | span-btn">
                                        <Icon name="Favorite"></Icon>
                                        {comments[0].likes}
                                    </span>
                                    <span className="fs-400 fw-semibold | span-btn">
                                        <Icon name="Chat_plus"></Icon>
                                        Reply
                                    </span>
                                    <time className="fs-400 fw-light" dateTime={comments[0].time}>{new Date(comments[0].time).toDateString()}</time>
                                </div>
                                {
                                    comments[0].replies.length > 0 ? (
                                        <div className="comment-replies">
                                            <span className="fs-400 fw-semibold | span-btn" onClick={() => focusPost()}>
                                                View {comments[0].replies.length} {comments[0].replies.length == 1 ? "reply" : "replies"}
                                            </span>
                                        </div>
                                    ) : ""
                                }
                            </div>
                        </div>
                    ) : ""
                }
                <div className="post-comments-more">
                    <span className="fs-500 fw-semibold | span-btn" onClick={() => focusPost()}>See more comments</span>
                </div>
            </section>
        </article>
    );
}

const FocusedPost = ({post}) => {

}

export default UserPost;
