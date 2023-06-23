import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsChatRight } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";

import "./style.scss";

const url = "https://panorbit.in/api/users.json";

const Chats = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [containerHeight, setContainerHeight] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);

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

  return (
    <div
      className={
        showChatBox
          ? "chats-container chats-container-bottom-0"
          : "chats-container"
      }
    >
      <nav className={showChatBox ? "chats-nav" : "chats-nav"}>
        <BsChatRight />
        <p>Chats</p>
        <div className="open-close-arrow" onClick={() => handleChatbox()}>
          {showChatBox ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
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
