import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./views/Login";
import Preloader from "./components/Preloader";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";

const App = () => {
  let token = sessionStorage.getItem("token");
  let [user, setUser] = useState({});
  const api = "https://crms-api.herokuapp.com/api/v1";

  console.log(user, "from app");

  const setCurrentUser = (state = false) => {
    if (!state) return setUser({});
    axios
      .get(`${api}/v1/user/${sessionStorage.getItem("_id")}`)
      .then((res) => res.data)
      .then((user) => setUser(user.data));
  };

  return (
    <Router>
      <Preloader />
      <Routes>
        <Route
          path="/"
          element={<Login setUser={setCurrentUser} api={api} />}
        />
        <Route
          path="/logout"
          element={<Login setUser={setCurrentUser} api={api} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Layout user={"waheed"} token={token} />}
          />{" "}
          {/*Home setUser= {setCurrentUser}*/}
          <Route path="/dashboard/add-user" element={<Layout api={api} />} />
          <Route
            path="/dashboard/add_criminal"
            element={<Layout api={api} />}
          />
          <Route path="/dashboard/criminal" element={<Layout api={api} />} />
          <Route
            path="/dashboard/criminal/:id"
            element={<Layout api={api} />}
          />
          <Route
            path="/dashboard/criminals_report"
            element={<Layout api={api} />}
          />
          <Route path="/dashboard/add-staff" element={<Layout api={api} />} />
          <Route path="/dashboard/staff" element={<Layout api={api} />} />
          <Route path="/dashboard/user/:id" element={<Layout api={api} />} />
          <Route
            path="/dashboard/staff_report"
            element={<Layout api={api} />}
          />
        </Route>
        <Route path="*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
