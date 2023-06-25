import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const url = "https://panorbit.in/api/users.json";

const DisplayUserData = () => {
  const [users, setUsers] = useState([]);
  const [presentUserData, setPresentUserData] = useState([]);
  const presentUser = useSelector((data) => data);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("pp", presentUser);
    fetchData();
  }, [presentUser]);

  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    if (presentUser) {
      const userData = data.users.filter((e, i) => {
        return e.id == presentUser.user.id;
      });
      console.log("user", userData[0]);
      setPresentUserData(userData[0]);
    }
    setUsers(data);
    console.log(data.users);
  };
  return (
    <div className="display-data">
      <div className="img-container">
        <img src={presentUserData && presentUserData.profilepicture} alt="" />
      </div>
      <div className="user-data">
        <p>{presentUserData && presentUserData.name}</p>
        <p>{presentUserData && presentUserData.email}</p>
      </div>
      <div>
        <button onClick={() => navigate("/accounts")}>Sign out</button>
      </div>
    </div>
  );
};

export default DisplayUserData;
