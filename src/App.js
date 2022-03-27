import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Criminals from "./components/Criminals";
import Login from "./views/Login";
import AddPolice from "./views/AddPolice";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";

const App = () => {
  let token = sessionStorage.getItem("token");
  let [user, setUser] = useState({});

  const setCurrentUser = (state = false) => {
    if (!state) return setUser({});
    axios
      .get(
        `https://crms-api.herokuapp.com/api/v1/user/${sessionStorage.getItem(
          "_id"
        )}`
      )
      .then((res) => res.data)
      .then((user) => setUser(user.data));
  };

  return (
    <Router>
      <Navbar type={token ? user.type : ""} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setCurrentUser} />} />
        <Route path="/logout" element={<Login setUser={setCurrentUser} />} />
        <Route path="/add_police" element={<AddPolice />} />
        <Route
          path="/criminals"
          element={<Criminals filter={false} title="Criminals" token={token} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
