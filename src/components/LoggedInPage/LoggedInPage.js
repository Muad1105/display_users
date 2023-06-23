import React, { Suspense } from "react";
import Navigation from "./miniComponents/Navigation";
import MainSection from "./miniComponents/MainSection";

import "./style.scss";
// import Chats from "./miniComponents/chats";

const ChatComponent = React.lazy(() => import("./miniComponents/chats"));

const LoggedInPage = () => {
  return (
    <div className="user-logged-section">
      <Navigation />
      <MainSection />
      <Suspense fallback={<div>Loading...</div>}>
        <ChatComponent />
      </Suspense>{" "}
    </div>
  );
};

export default LoggedInPage;
