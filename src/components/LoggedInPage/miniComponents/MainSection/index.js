import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import ToDo from "../Navigation/miniComponents/ToDo";

import "../style.scss";
import DisplayUserData from "./miniComponent/DisplayUserData";
import UserChat from "../userChat/UserChat";
import Chats from "../chats";

const Gallery = React.lazy(() =>
  import("../Navigation/miniComponents/Gallery")
);
const Posts = React.lazy(() => import("../Navigation/miniComponents/Posts"));
const Profile = React.lazy(() =>
  import("../Navigation/miniComponents/Profile")
);

const ChatComponent = React.lazy(() => import("../chats"));

const url = "https://panorbit.in/api/users.json";

const MainSection = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [browsingSection, setBrowsingSection] = useState("");
  const [userData, setUserData] = useState({});
  const [userListData, setUserListData] = useState({});
  const [displayUserData, setDisplayUserData] = useState(false);

  const user = useSelector((data) => data.user);

  const refNav = useRef();
  const refCard = useRef();

  useEffect(() => {
    console.log(user);
    setUserData(user);
    fetchUser();
  }, [user]);

  useEffect(() => {
    setCurrentUserId(userData.id);
    setBrowsingSection(userData.section);
  }, [userData, user]);

  const fetchUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const userDataToDisplay = data.users.filter((e, i) => {
      return e.id == user.id;
    });
    setUserListData(userDataToDisplay[0]);
  };

  // useEffect(() => {
  //   console.log(ref);
  // }, [ref]);

  document.addEventListener("click", (e) => {
    if (
      refCard.current &&
      refNav.current &&
      !refCard.current.contains(e.target) &&
      !refNav.current.contains(e.target)
    ) {
      setDisplayUserData(false);
    }
  });

  return (
    <div className="main-section">
      <nav className="header">
        <div className="section-head">{browsingSection}</div>
        <div
          ref={refNav}
          className="name-photo"
          onClick={() => setDisplayUserData(!displayUserData)}
        >
          <img
            src={
              userListData &&
              userListData.profilepicture &&
              userListData.profilepicture
            }
            alt="profile pic"
          />
          <div className="user-name">
            {userListData && userListData.name && userListData.name}
          </div>
        </div>
        {displayUserData && (
          <div ref={refCard} className="user-data-card">
            <DisplayUserData />
          </div>
        )}
      </nav>
      <div className="user-data">
        {browsingSection === "profile" && <Profile />}
        {browsingSection === "posts" && <Posts />}
        {browsingSection === "gallery" && <Gallery />}
        {browsingSection === "todo" && <ToDo />}
      </div>
      <div className="chat-container">
        <div className="user-chatbox">
          {user.chatUser
            ? user.chatUser.map((e, i) => {
                return <UserChat id={e} />;
              })
            : ""}
        </div>
        <div className="available-users">
          <Suspense fallback={<div>Loading...</div>}>
            <ChatComponent />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
