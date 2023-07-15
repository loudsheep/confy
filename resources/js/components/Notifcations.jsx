import React from "react";

import Icon from "../components/Icon";

const Notifications = ({ notifications, pendingFriendsRequests }) => {

    const addPendingFriendsNotifications = () => {
        let result = [];

        pendingFriendsRequests.forEach(request => {
            // console.log(request);
            let r = {
                type: "send_fr",
                person: {
                    first_name: request.profile.first_name,
                    last_name: request.profile.last_name,
                    username: request.name,
                    profile_image: request.profile.profile_image,
                },
                linkToPost: "https://www.youtube.com/watch?v=ep761iSbrCI",
                isSeen: false,
                notificationTime: request.pivot.created_at,
            };

            result.push(r);
        });

        return result;
    };

    //test only
    // let nont = [
    //     {
    //         type: "accepted_fr",
    //         person: {
    //             first_name: "John",
    //             last_name: "Snow",
    //             username: "john_snow",
    //             profile_image: "https://i.pravatar.cc/300",
    //         },
    //         linkToPost: "https://www.youtube.com/watch?v=ep761iSbrCI",
    //         isSeen: false,
    //         notificationTime: "2023-07-14T15:12:26.000000Z"
    //     },
    //     {
    //         type: "accepted_fr",
    //         person: {
    //             first_name: "John",
    //             last_name: "Snow",
    //             username: "john_snow",
    //             profile_image: "https://i.pravatar.cc/300",
    //         },
    //         linkToPost: "https://www.youtube.com/watch?v=ep761iSbrCI",
    //         isSeen: false,
    //         notificationTime: "2023-07-14T15:12:26.000000Z"
    //     },
    //     {
    //         type: "accepted_fr",
    //         person: {
    //             first_name: "John",
    //             last_name: "Snow",
    //             username: "john_snow",
    //             profile_image: "https://i.pravatar.cc/300",
    //         },
    //         linkToPost: "https://www.youtube.com/watch?v=ep761iSbrCI",
    //         isSeen: false,
    //         notificationTime: "2023-07-14T15:12:26.000000Z"
    //     },
    //     {
    //         type: "accepted_fr",
    //         person: {
    //             first_name: "John",
    //             last_name: "Snow",
    //             username: "john_snow",
    //             profile_image: "https://i.pravatar.cc/300",
    //         },
    //         linkToPost: "https://www.youtube.com/watch?v=ep761iSbrCI",
    //         isSeen: false,
    //         notificationTime: "2023-07-14T15:12:26.000000Z"
    //     },
    //     {
    //         type: "accepted_fr",
    //         person: {
    //             first_name: "John",
    //             last_name: "Snow",
    //             username: "john_snow",
    //             profile_image: "https://i.pravatar.cc/300",
    //         },
    //         linkToPost: "https://www.youtube.com/watch?v=ep761iSbrCI",
    //         isSeen: false,
    //         notificationTime: "2023-07-14T15:12:26.000000Z"
    //     },
        
    // ];

    const nont = addPendingFriendsNotifications();

    let notificationsToDisplay = nont.map(n => <Notification
        type={n.type}
        person={n.person}
        linkToPost={n.linkToPost}
        wasSeen={n.wasSeen}
        notificationTime={n.notificationTime}>
    </Notification>);

    return (
        <section className="notifications" id="notifications-menu" autoFocus>
            <div className="notifications-heading">
                <h2 className="fw-bold clr-neutral-500">Notifications</h2>
                <div>
                    <button>
                        <Icon name="Filter_alt"></Icon>
                    </button>
                    <button>
                        <Icon name="Meatballs_menu"></Icon>
                    </button>
                </div>
            </div>
            <div className="list-wrapper">
                <ul role="list" className="notifications-list" aria-label="Notifications">
                    {nont.length != 0 ? notificationsToDisplay : <NoNotifications></NoNotifications>}
                </ul>
            </div>
        </section>
    )
}

// type -> type of notification
// person -> with whom this notification is associated
// wasSeen -> has user already read that notification.
const Notification = ({ type = "notification", person, linkToPost = "", notificationTime, wasSeen = false }) => {

    const IconToRender = (type) => {
        switch (type) {
            case "notification":
                return <Icon name="Bell"></Icon>;
            case "accepted_fr":
                return <Icon name="Group_Accepted"></Icon>;
            case "send_fr":
                return <Icon name="Group_Add_Light"></Icon>;
            case "liked_post":
                return <Icon name="Favorite"></Icon>;
            case "liked_comment":
                return <Icon name="Favorite"></Icon>;
            case "commented_post":
                return <Icon name="Comment"></Icon>;
            case "replied_to_comment":
                return <Icon name="Comment"></Icon>;
            case "tagged_post":
                return <Icon name="Label"></Icon>;
            case "has_bday":
                return <Icon name="Gift"></Icon>;
            default:
                return <Icon name="Bell"></Icon>
        }
    }

    const ContentToRender = (type, person, customText = "") => {
        switch (type) {
            case "notification":
                return <p className="fw-regular fs-400 | notification-text">{customText}</p>;
            case "accepted_fr":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    accepted your friend request.</p>;
            case "send_fr":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    send you a friend request.</p>;
            case "liked_post":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    liked your post.</p>;
            case "liked_comment":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    liked your comment.</p>;
            case "commented_post":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    commented your post.</p>;
            case "replied_to_comment":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    replied to your comment.</p>;
            case "tagged_post":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    tagged you on post.</p>;
            case "has_bday":
                return <p className="fw-regular fs-400 | notification-text">
                    <span className="fw-semibold">{person.first_name + " " + person.last_name} </span>
                    has birthday today.</p>;
            default:
                return <p className="fw-regular fs-400 | notification-text">{customText}</p>
        }
    }

    const ConvertDate = (date) => {
        let now = Date.now();
        let time = Date.parse(date);
    }

    return (
        <li>
            <a href={linkToPost} className="notification">
                <div className="notification-avatar">
                    <div className="notification-type">
                        {IconToRender(type)}
                    </div>
                    <img src={person.profile_image} alt={person.username} className="profile-picture" />
                </div>
                <div className="notification-content">
                    {ContentToRender(type, person)}
                    {ConvertDate(notificationTime)}
                </div>
            </a>
        </li>
    );
}



const NoNotifications = () => {
    return (
        <div className="no-notifications">
            <Icon name="Bell"></Icon>
            <p className="fw-bold clr-neutral-500">You have no notifications</p>
        </div>
    );
}

export default Notifications;