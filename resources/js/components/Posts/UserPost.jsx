import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";

import Icon from '../Icon';
import EmojiPicker from '../EmojiPicker';
import Comment from './Comment';

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
    };

    let time = new Date(postTime);

    let media = content.media.map((m, id) =>
        <div key={id} className="media-wrapper">
            <img className="media-image-bg" src={m} />
            <img className="media-image" src={m} />
        </div>
    );

    const commentInp = useRef(null);
    const commentInpFocused = useRef(null);
    const focusComment = () => {
        if (focused) {
            commentInpFocused.current.focus();
        } else {
            commentInp.current.focus();
        }
    }

    const addEmoji = (emoji) => {

        let input = focused ? commentInpFocused : commentInp;

        input.current.focus();
        let pointer = input.current.selectionStart;
        let value = input.current.value;

        let out = value.slice(0, pointer) + emoji.native + value.slice(pointer);

        input.current.value = out;
    };

    const [focused, setFocused] = useState(false);

    const [liked, setLiked] = useState(0);

    const focusedPost = (
        <div className='post-focused | modal' onClick={(e) => {
            if (e.target.classList.contains("post-focused")) {
                setFocused(false);
            }
        }}>
            <div className="post-focused-body | modal-body box-shadow">
                <div className='fp-media'>
                    <Slider {...sliderSettings}>
                        {media}
                    </Slider>
                </div>
                <div className='fp-content'>
                    <header className='fp-header'>
                        <div className="profile">
                            <img src={profile.profile.profile_image} alt={profile.name} className="profile-picture" />
                            <div>
                                <p className="fw-medium fs-500">{`${profile.profile.first_name} ${profile.profile.last_name}`}</p>
                                <time className="fs-300 fw-light" dateTime={postTime}>{time.toDateString()}</time>
                            </div>
                        </div>
                        <div className="post-menu">
                            <button className="menu-btn" onClick={() => setFocused(false)}>
                                <Icon name="Close_round"></Icon>
                            </button>
                        </div>
                    </header>
                    <div>
                        <p className="fs-500 fw-light">{content.text}</p>
                    </div>
                    <div className='fp-content-cta'>
                        <button className="btn | like-btn" onClick={() => {
                            if (liked == 0) {
                                setLiked(1);
                            } else {
                                setLiked(0);
                            }
                        }} liked={liked}>
                            {liked == 0 && <Icon name="Favorite"></Icon>}
                            {liked == 1 && <Icon name="Favorite_fill"></Icon>}
                            <p className="text">{likes != 0 ? likes : "Like"}</p>
                        </button>
                        <button className="btn | comment-btn" onClick={() => focusComment()}>
                            <Icon name="Comment"></Icon>
                            <p className="text">Comment</p>
                        </button>
                        <button className="btn | share-btn">
                            <Icon name="Send"></Icon>
                            <p className="text">Share</p>
                        </button>
                    </div>
                    <div className='fp-comments'>
                        {comments.map((c) => <Comment
                            profile={c.profile}
                            content={c.text}
                            time={c.time}
                            likes={c.likes}
                            replies={c.replies}
                        ></Comment>)}
                    </div>
                    <form className="fp-comments-cta">
                        <img src={user.profile_image} alt={`${user.first_name} ${user.last_name}`} className="profile-picture" />
                        <div className="input">
                            <input ref={commentInpFocused} id="comment-input" type="text" autoComplete="off" placeholder="Write a comment..." />
                            <EmojiPicker onEmojiSelect={(emoji) => addEmoji(emoji)}></EmojiPicker>
                            <button className="input-btn" type="submit">
                                <Icon name="Send_hor"></Icon>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <article className="post | box-shadow">
            <header className="post-header">
                <div className="profile">
                    <img src={profile.profile.profile_image} alt={profile.name} className="profile-picture" />
                    <div>
                        <p className="fw-medium fs-500">{`${profile.profile.first_name} ${profile.profile.last_name}`}</p>
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
                <div className="post-media" onDoubleClick={() => setFocused(true)}>
                    <Slider {...sliderSettings}>
                        {media}
                    </Slider>
                </div>
            </section>
            <section className="post-cta">
                <button className="btn | like-btn" onClick={() => {
                    if (liked == 0) {
                        setLiked(1);
                    } else {
                        setLiked(0);
                    }
                }} liked={liked}>
                    {liked == 0 && <Icon name="Favorite"></Icon>}
                    {liked == 1 && <Icon name="Favorite_fill"></Icon>}
                    <p className="text">{likes != 0 ? likes : "Like"}</p>
                </button>
                <button className="btn | comment-btn" onClick={() => focusComment()}>
                    <Icon name="Comment"></Icon>
                    <p className="text">Comment</p>
                </button>
                <button className="btn | share-btn">
                    <Icon name="Send"></Icon>
                    <p className="text">Share</p>
                </button>
            </section>
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
                        <Comment
                            profile={comments[0].profile}
                            content={comments[0].text}
                            time={comments[0].time}
                            likes={comments[0].likes}
                            replies={comments[0].replies}
                        ></Comment>
                    ) : ""
                }
                <div className="post-comments-more">
                    <span className="fs-500 fw-semibold | span-btn" onClick={() => setFocused(true)}>See more comments</span>
                </div>
            </section>
            {focused && focusedPost}
        </article>
    );
}

export default UserPost;
