import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

const url = "https://panorbit.in/api/users.json";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const user = useSelector((data) => data);

  useEffect(() => {
    fetchUser();
    console.log(user);
  }, [user]);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const fetchUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.users);
    const userDataToDisplay = data.users.filter((e, i) => {
      console.log(user.user);
      return e.id == user.user.id;
    });
    setUserData(userDataToDisplay[0]);
    console.log(userDataToDisplay);
  };

  return (
    <div>
      <main>
        <div className="personal-and-company-data">
          <div className="personal-data-section">
            <div className="img-name">
              <img src={userData.profilepicture} alt="" />
              <p>
                <span>{userData.name}</span>
              </p>
            </div>
            <div className="personal-data">
              <div className="label">
                <p>Username :</p>
                <p>e-mail :</p>
                <p>Phone :</p>
                <p>Website :</p>
              </div>
              <div className="input">
                <p>{userData && userData.username}</p>
                <p>{userData && userData.email}</p>
                <p>{userData && userData.phone}</p>
                <p>{userData && userData.website}</p>
              </div>
            </div>
          </div>
          <div className="company-data-section">
            <p>Company</p>
            <div className="company-data">
              <div className="label">
                <p>Name:</p>
                <p>catchphrase:</p>
                <p>bs: </p>
              </div>
              <div className="input">
                <p>{userData && userData.company.name}</p>
                <p>{userData && userData.company.catchPhrase}</p>
                <p>{userData && userData.company.bs}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="address-section">
          <p>Address</p>
          <div className="address-data">
            <div className="label">
              <p>Street :</p>
              <p>Suite :</p>
              <p>City :</p>
              <p>Zipcode :</p>
            </div>
            <div className="input">
              <p>{userData && userData.address.street}</p>
              <p>{userData && userData.address.suite}</p>
              <p>{userData && userData.address.city}</p>
              <p>{userData && userData.address.zipcode}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
