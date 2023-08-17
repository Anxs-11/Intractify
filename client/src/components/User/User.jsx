import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { newChat } from "../../api/ChatRequest";
const User = ({ person }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch()

    const [following, setFollowing] = useState(
        person.followers.includes(user._id)
    );
    const handleFollow = () => {
        
        following
            ? dispatch(unfollowUser(person._id, user))
            : dispatch(followUser(person._id, user));
        
        setFollowing((prev) => !prev);
    };
    const chathandle=()=>{
        if (!following) {
            
            
            newChat({ senderId: user._id, receiverId: person._id })
        }
    }
    
    return (
        <div className="follower">
            <div>
                <img
                    src={
                        person.profilePicture
                            ? serverPublic + person.profilePicture
                            : serverPublic + "defaultprofile.png"
                    }
                    alt="profile"
                    className="followerImage"
                />
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button
                className={
                    following ? "button fc-button UnfollowButton" : "button fc-button"
                }
                onClick={() => {
                    handleFollow();
                    chathandle();
                }}
            >
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
};

export default User;