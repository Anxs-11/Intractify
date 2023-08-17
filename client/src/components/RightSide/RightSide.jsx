import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
const RightSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [ProfilemodalOpened, setProfileModalOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        
        <UilSetting onClick={() => setProfileModalOpened(true) }/>
        
  
        <img src={Noti} alt="" />
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>
        
      </div>

      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
      <ProfileModal
        modalOpened={ProfilemodalOpened}
        setModalOpened={setProfileModalOpened}
        data={user}
      />
    </div>
  );
};

export default RightSide;
