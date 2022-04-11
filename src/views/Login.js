import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../css/login.css";
function Login({ api }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [iserror, setIserror] = useState(false);

  useEffect((_) => {
    if (pathname === "/logout" && sessionStorage.getItem("token")) {
      sessionStorage.clear();
      return navigate("/");
    } else if (pathname === "/logout" && !sessionStorage.getItem("token"))
      return navigate("/");

    if (sessionStorage.getItem("token") && pathname === "/")
      return navigate("/dashboard");
  });

  const submit = async (e) => {
    e.preventDefault();

    // validation

    if (login.username === "") {
      document.querySelector("#username").classList.add("error");
      return;
    } else if (login.password === "") {
      document.querySelector("#password").classList.add("error");
      return;
    }

    try {
      let res = await axios.post(`${api}/user/login`, login);
      res = await res.data;
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("_id", res._id);
    } catch (err) {
      setLogin({ username: "", password: "" });
      setIserror(true);
    }

    if (sessionStorage.getItem("token")) {
      return navigate("/dashboard");
    }
  };

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
                  {iserror ? (
                    <p className="text-center text-danger">
                      Invalid credential
                    </p>
                  ) : null}
                </div>
                <form method="post" onSubmit={submit}>
                  <div className="form-group first">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                      onChange={(e) => {
                        setLogin({ ...login, username: e.target.value });
                        e.target.classList.remove("error");
                      }}
                      value={login.username ? login.username : ""}
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
                      value={login.password ? login.password : ""}
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
