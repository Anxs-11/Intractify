

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import { useSelector } from "react-redux";
import React, { useState } from "react";
const NavIcons = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    console.log(user)
    const [ProfilemodalOpened, setProfileModalOpened] = useState(false);
    return (
        <div className="navIcons">
            <Link to="../home">
                <img src={Home} alt="" />
            </Link>
            {/* <UilSetting onClick={() => setProfileModalOpened(true)} /> */}
            <UilSetting  />
            <img src={Noti} alt="" />
            <Link to="../chat">
                <img src={Comment} alt="" />
            </Link>
            <ProfileModal
                modalOpened={ProfilemodalOpened}
                setModalOpened={setProfileModalOpened}
                data={user}
            />
        </div>
    );
};

export default NavIcons;