import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import "./style.scss";

import { useDispatch, useSelector } from "react-redux";

import { editChatWithUsers } from "../../../../redux/reducer";

import { FaGreaterThan } from "react-icons/fa";

const url = "https://panorbit.in/api/users.json";

const UserChat = (props) => {
  // to list the users to chat container
  const [chatListUsers, setChatListUsers] = useState([]);
  // set the height of List element
  const [containerHeight, setContainerHeight] = useState("");
  // to toggle chat container
  const [showChatBox, setShowChatBox] = useState(false);
  // present user opened
  const [chatUser, setChatUser] = useState([]);
  //list of users opened to chat
  const [userListOpenToChat, setUserListOpenToChat] = useState([]);

  const dispatch = useDispatch();

  const userListOpenedToChat = useSelector((data) => data);

  useEffect(() => {}, [userListOpenedToChat]);

  useEffect(() => {
    fetchData();
    console.log("userListOpenedToChat", userListOpenedToChat.user.chatUser);
    console.log(props);
    fetchUserChat();
    editChatUser();
  }, []);

  useEffect(() => {
    console.log(chatListUsers);
  }, [chatListUsers]);

  const editChatUser = () => {};

  const fetchUserChat = async () => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const chatUser = data.users.filter((e, i) => {
      return e.id == props.id;
    });
    console.log(chatUser);
    setChatUser(chatUser[0]);
  };

  const fetchData = () => {
    axios.get(url).then((res) => {
      console.log("res", res.data.users);
      setChatListUsers(res.data.users);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerWidth / 6);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerHeight]);

  const onScroll = (e) => {
    console.log(e.currentTarget);
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      containerHeight
    ) {
      fetchData();
    }
  };

  const handleChatbox = () => {
    console.log("chat");
    setShowChatBox(!showChatBox);
  };

  const displayUserChatbox = (e) => {
    console.log(e);
  };

  const closeChat = () => {
    console.log("close", userListOpenedToChat.user.chatUser);
    const chatList = userListOpenedToChat.user.chatUser.filter((e, i) => {
      console.log(e);
      return e !== props.id;
    });
    console.log(chatList);
    dispatch(editChatWithUsers(chatList));
  };

  return (
    <div
      className={
        showChatBox
          ? "chat-user-section style-on-hide-main"
          : "chat-user-section"
      }
    >
      <nav
        className={showChatBox ? "chats-nav chats-nav-bottom-0" : "chats-nav"}
      >
        <div className="chat-title">
          <img src={chatUser.profilepicture} alt="" />
        </div>
        <div onClick={() => handleChatbox()}>{chatUser.name}</div>
        <div className="open-close-arrow" onClick={() => handleChatbox()}>
          {showChatBox ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </div>
        <div className="close-btn" onClick={() => closeChat()}>
          <AiOutlineCloseCircle />
        </div>
      </nav>
      <main className={showChatBox ? "main display-main" : "main"}>
        {/* <List className="list-section">
          <VirtualList
            data={""}
            height={containerHeight}
            itemHeight={17}
            itemKey="id"
            onScroll={onScroll}
            className="virtual-list-container"
          > */}
        <div>chat</div>

        <div className="user-chat">
          <input type="text" />
          <div className="go-btn">
            <FaGreaterThan />
          </div>
        </div>
        {/* </VirtualList>
        </List> */}
      </main>
    </div>
  );
};

export default UserChat;
