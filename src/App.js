import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./views/Login";
import Preloader from "./components/Preloader";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      token: sessionStorage.getItem("token"),
      api: "https://crms-api.herokuapp.com/api/v1", //"http://localhost:7700/api/v1";
    };
  }

  componentDidMount() {
    if (this.state.token)
      this.setCurrentUser(true, sessionStorage.getItem("id"));
  }

  setCurrentUser = (state = false, id) => {
    if (!state) return this.setState({ user: null });
    axios
      .get(`${this.state.api}/user/${id}`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .then((user) => {
        const { data } = user;
        this.setState({ user: data });
        console.log(data.admin);
        sessionStorage.setItem("isAdmin", data.admin);
      });
  };
  render() {
    const { token, api, user } = this.state;
    return (
      <Router>
        <Preloader />
        <Routes>
          <Route
            path="/"
            element={<Login setUser={this.setCurrentUser} api={api} />}
          />
          <Route
            path="/logout"
            element={<Login setUser={this.setCurrentUser} api={api} />}
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<Layout user={"waheed"} token={token} api={api} />}
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
            <Route
              path="/dashboard/change_password"
              element={<Layout api={api} email={user?.email} />}
            />
          </Route>
          <Route path="*" element={<Layout />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
