import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Gallery from "../Navigation/miniComponents/Gallery";
import Posts from "../Navigation/miniComponents/Posts";
import Profile from "../Navigation/miniComponents/Profile";
import ToDo from "../Navigation/miniComponents/ToDo";

import "../style.scss";

const url = "https://panorbit.in/api/users.json";

const MainSection = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [browsingSection, setBrowsingSection] = useState("");
  const [userData, setUserData] = useState({});
  const [userListData, setUserListData] = useState({});

  const user = useSelector((data) => data.user);

  useEffect(() => {
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

  return (
    <div className="main-section">
      <nav className="header">
        <div className="section-head">{browsingSection}</div>
        <div className="name-photo">
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
      </nav>
      <div className="user-data">
        {browsingSection === "profile" && <Profile />}
        {browsingSection === "posts" && <Posts />}
        {browsingSection === "gallery" && <Gallery />}
        {browsingSection === "todo" && <ToDo />}
      </div>
    </div>
  );
};

export default MainSection;
