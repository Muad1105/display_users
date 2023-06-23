import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import axios from "axios";

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
    axios
      .get(url)
      .then((res) => {
        const userDataToDisplay = res.data.users.filter((e, i) => {
          return e.id == user.user.id;
        });
        console.log(user.user);
        console.log(userDataToDisplay);
        setUserData(userDataToDisplay[0]);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <div className="label-input">
                <p>Username :</p>
                <p>{userData && userData.username}</p>
              </div>
              <div className="label-input">
                <p>e-mail :</p>
                <p>{userData && userData.email}</p>
              </div>
              <div className="label-input">
                <p>Phone :</p>
                <p>{userData && userData.phone}</p>
              </div>
              <div className="label-input">
                <p>Website :</p>
                <p>{userData && userData.website}</p>
              </div>
            </div>
          </div>
          <div className="company-data-section">
            <p>Company</p>
            <div className="company-data">
              <div className="label-input">
                <p>Name :</p>
                <p>{userData && userData.company.name}</p>
              </div>
              <div className="label-input">
                <p>catchphrase :</p>
                <p>{userData && userData.company.catchPhrase}</p>
              </div>
              <div className="label-input">
                <p>bs : </p>
                <p>{userData && userData.company.bs}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="address-map-section">
          <div className="address-section">
            <p>Address</p>
            <div className="address-data">
              <div className="label-input">
                <p>Street :</p>
                <p>{userData && userData.address.street}</p>
              </div>
              <div className="label-input">
                <p>Suite :</p>
                <p>{userData && userData.address.suite}</p>
              </div>
              <div className="label-input">
                <p>City :</p>
                <p>{userData && userData.address.city}</p>
              </div>
              <div className="label-input">
                <p>Zipcode :</p>
                <p>{userData && userData.address.zipcode}</p>
              </div>
            </div>
          </div>
          <div className="map">Map</div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
