import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { chatWithUser } from "../../../../redux/reducer";

import "./style.scss";

const url = "https://panorbit.in/api/users.json";

const Chats = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [containerHeight, setContainerHeight] = useState("");
  const [showChatBox, setShowChatBox] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(chatUsers);
  }, [chatUsers]);

  const fetchData = () => {
    axios.get(url).then((res) => {
      console.log("res", res.data.users);
      setChatUsers(res.data.users);
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
    dispatch(chatWithUser(e));
    console.log(e);
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
          <BsChatRight />
          <p>Chats</p>
        </div>
        <div className="open-close-arrow" onClick={() => handleChatbox()}>
          {showChatBox ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </div>
      </nav>
      <main className={showChatBox ? "main display-main" : "main"}>
        <List className="list-section">
          <VirtualList
            data={chatUsers}
            height={containerHeight}
            itemHeight={17}
            itemKey="id"
            onScroll={onScroll}
            className="virtual-list-container"
          >
            {(item) => (
              <List.Item key={item.id} className="item-list">
                <List.Item.Meta
                  className="list-item-meta"
                  // open selected user chat
                  onClick={() => displayUserChatbox(item.id)}
                  avatar={
                    <Avatar
                      src={item.profilepicture}
                      className="avatar-style"
                    />
                  }
                  title={<a className="title-style">{item.name}</a>}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      </main>
    </div>
  );
};

export default Chats;
