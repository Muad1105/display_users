import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AccountLists from "./components/AccountList";
import LoggedInPage from "./components/LoggedInPage/LoggedInPage";
// import Profile from "./components/LoggedInPage/miniComponents/Navigation/miniComponents/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="/accounts" />} />
        <Route path="/accounts" element={<AccountLists />} />
        <Route path="/accounts/:id" element={<LoggedInPage />}>
          <Route path="profile" element={<LoggedInPage />} />
          <Route path="posts" element={<LoggedInPage />} />
          <Route path="gallery" element={<LoggedInPage />} />
          <Route path="todo" element={<LoggedInPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
