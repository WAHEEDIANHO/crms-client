import { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../css/login.css";
function Login({ setUser }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const submit = async (e) => {
    e.preventDefault();

    let res = await axios.post(
      "https://crms-api.herokuapp.com/api/v1/user/login",
      login
    );
    res = await res.data;
    sessionStorage.setItem("token", res.token);
    sessionStorage.setItem("_id", res._id);
    setUser(true);

    if (sessionStorage.getItem("token").length !== 0) {
      setUser(true);
      return navigate("/");
    }
  };

  if (sessionStorage.getItem("token") && pathname === "/logout") {
    sessionStorage.clear();
    setUser(false);
  } else {
    if (sessionStorage.getItem("token") && pathname === "/login") setUser(true);
  }

  useEffect((_) => {
    if (pathname === "/logout" && !sessionStorage.getItem("token")) {
      return navigate("/login");
    }
    if (sessionStorage.getItem("token") && pathname === "/login")
      return navigate("/");
  });

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-md-6 order-md-2">
            <img src="img/crime.png" alt="crime.png" className="img-fluid" />
          </div>
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <h3>
                    Sign In to <strong>CRMS</strong>
                  </h3>
                  <p className="mb-4">Crime Managemen System</p>
                </div>
                <form method="post" onSubmit={submit}>
                  <div className="form-group first">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                      onChange={(e) =>
                        setLogin({ ...login, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group last mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                    />
                  </div>

                  <input
                    type="submit"
                    value="Log In"
                    className="btn text-white btn-block btn-primary w-100"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
