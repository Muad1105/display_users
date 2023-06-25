import React, { Suspense } from "react";
import Navigation from "./miniComponents/Navigation";
import MainSection from "./miniComponents/MainSection";

import DisplayUserData from "./miniComponents/MainSection/miniComponent/DisplayUserData";

import "./style.scss";

const LoggedInPage = () => {
  return (
    <div className="user-logged-section">
      <Navigation />
      <MainSection />
    </div>
  );
};

export default LoggedInPage;
