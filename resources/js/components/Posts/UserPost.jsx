import React, { useEffect, useRef } from 'react';
import Slider from "react-slick";

import Icon from '../Icon';

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

    let commentsDisplay = comments.map((c) => {
        let replies = c.replies;

        return (
            <div className="comment">
                <div className="comment-profile">

                </div>
                <div className="comment-content">
                    <div className="comment-text">

                    </div>
                    <div className="comment-cta">

                    </div>
                    <div className="see-replies">

                    </div>
                </div>
            </div>
        );
    })


    return (
        <article className="post box-shadow">
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
                <div className="post-comments-cta">
                    <img src={user.profile_image} alt={`${user.first_name} ${user.last_name}`} className="profile-picture" />
                    <div className="input">
                        <input ref={commentInp} id="comment-input" type="text" placeholder="Write a comment..." />
                    </div>
                </div>
                {
                    comments.length != 0 ? (
                        <div className="comment">
                            <div className="comment-profile">
                                <img src="https://i.pravatar.cc/300" alt="" className="profile-picture" />
                            </div>
                            <div className="comment-content">
                                <div className="text">
                                    <p className="fs-400 fw-semibold">Alex Butler</p>
                                    <div className="comment-text">
                                        <p className="fs-500 fw-light">{comments[0].text}</p>
                                    </div>
                                </div>
                                <div className="comment-cta">
                                    <span className="fs-400 fw-semibold">
                                        <Icon name="Favorite"></Icon>
                                        {comments[0].likes}
                                    </span>
                                    <span className="fs-400 fw-semibold">
                                        <Icon name="Chat_plus"></Icon>
                                        Reply
                                    </span>
                                    <time className="fs-400 fw-light" dateTime={comments[0].time}>{new Date(comments[0].time).toDateString()}</time>
                                </div>
                                {
                                    comments[0].replies.length > 0 ? (
                                        <div className="comment-replies">
                                            <span className="fs-400 fw-semibold">
                                                View {comments[0].replies.length} {comments[0].replies.length == 1 ? "reply" : "replies"}
                                            </span>
                                        </div>
                                    ) : ""
                                }
                            </div>
                        </div>
                    ) : ""
                }
                <div className="see-more">
                    <span className="fs-500 fw-semibold">See more comments</span>
                </div>
            </section>
        </article>
    );
}

export default UserPost;
