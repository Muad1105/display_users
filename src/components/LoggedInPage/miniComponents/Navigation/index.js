import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setUserId, showRequiredSection } from "../../../../redux/reducer";

const Navigation = () => {
  //Initial Profile Selection Values
  const [selectedProfileSection, setSelectedProfileSection] = useState({
    profile: true,
    posts: false,
    gallery: false,
    todo: false,
  });

  //Get which user is running
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    //distapch to store the present userId
    dispatch(setUserId(id));
    //dispatch to store the selected section
    dispatch(showRequiredSection("profile"));
  }, []);

  //function to check the onClick section and set the section clicked to true 
  const handleMainDisplay = (e) => {
    console.log(e);
    if (e === "profile") {
      dispatch(showRequiredSection("profile"));
      setSelectedProfileSection({
        posts: false,
        gallery: false,
        todo: false,
        profile: true,
      });
    }
    if (e === "posts") {
      dispatch(showRequiredSection("posts"));

      setSelectedProfileSection({
        posts: true,
        gallery: false,
        todo: false,
        profile: false,
      });
    }
    if (e === "gallery") {
      dispatch(showRequiredSection("gallery"));

      setSelectedProfileSection({
        posts: false,
        gallery: true,
        todo: false,
        profile: false,
      });
    }
    if (e === "todo") {
      dispatch(showRequiredSection("todo"));

      setSelectedProfileSection({
        posts: false,
        gallery: false,
        todo: true,
        profile: false,
      });
    }
  };

  return (
    <div className="navigation_container">
      <ul>
        <li>
          <Link
            to={`/accounts/${id}/profile`}
            className={
              selectedProfileSection.profile
                ? "nav-link nav-selected"
                : "nav-link"
            }
            onClick={() => handleMainDisplay("profile")}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to={`/accounts/${id}/posts`}
            className={
              selectedProfileSection.posts
                ? "nav-link nav-selected"
                : "nav-link"
            }
            onClick={() => handleMainDisplay("posts")}
          >
            Posts
          </Link>
        </li>
        <li>
          <Link
            to={`/accounts/${id}/gallery`}
            className={
              selectedProfileSection.gallery
                ? "nav-link nav-selected"
                : "nav-link"
            }
            onClick={() => handleMainDisplay("gallery")}
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to={`/accounts/${id}/todo`}
            className={
              selectedProfileSection.todo ? "nav-link nav-selected" : "nav-link"
            }
            onClick={() => handleMainDisplay("todo")}
          >
            Todo
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
