import React, { useEffect, useState } from "react";
import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import "./style.scss";

import { Link } from "react-router-dom";

const url = "https://panorbit.in/api/users.json";

const AccountsList = () => {
  const [data, setData] = useState([]);
  //To adjust the containetr height according to the screen width as the unit specified is vw for the content
  const [containerHeight, setContainerHeight] = useState("");

  const appendData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        setData(body.users);
        message.success(`${body.users.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
    setContainerHeight(window.innerWidth / 3.4);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerWidth / 3);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerHeight]);

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      containerHeight
    ) {
      appendData();
    }
  };

  return (
    <div className="account-section-container">
      <List className="list-section">
        <div className="account-section-head">Select An account</div>
        <VirtualList
          data={data}
          height={containerHeight}
          itemHeight={47}
          itemKey="id"
          onScroll={onScroll}
          className="virtual-list-container"
        >
          {(item) => (
            <div className="set-padding-to-list">
              <Link to={`/accounts/${item.id}`}>
                <List.Item key={item.id} className="item-list">
                  <div className="list-item-center">
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
                  </div>
                </List.Item>
              </Link>
            </div>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default AccountsList;
