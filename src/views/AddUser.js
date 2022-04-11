import { useState } from "react";
import axios from "axios";
import FormData from "form-data";

import Loader from "../components/Loader";
import Guide from "../components/Guide";

import "../css/login.css";
function AddCriminal({ title, api }) {
  console.log("backend", api);
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);

  const addUser = (e) => {
    e.preventDefault();
    setLoader(true);
    // console.log(file);
    const data = new FormData();
    data.append("file", file);

    // console.log(Object.entries(user).length);
    for (const [name, value] of Object.entries(user)) {
      console.log("append");
      data.append(name, value);
    }

    axios
      .post(`${api}/user/signup`, data, {
        "Content-Type": "multipart/form-data",
        headers: {
          authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser({
          sname: "",
          othername: "",
          role: "",
          phone: "",
          address: "",
          email: "",
          nationality: "",
          state: "",
          city: "",
          height: 0,
          weight: 0,
          dob: "",
          imageUrl: "",
          gender: "",
          marital_status: "",
        });
        setLoader(false);
      })
      .catch((err) => {
        alert("oops! error while submitting form \n please try again");
        setLoader(false);
      });
  };

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <>
      {loader ? <Loader /> : null}
      <div className="container-fluid">
        <Guide>
          <h3>
            Register {title} into <strong>CRMS</strong>
          </h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>
        {/* onSubmit={submit} */}
        <div className="container">
          <form className="row g-3" onSubmit={(e) => addUser(e)}>
            <div className="col-md-6 offset-md-3 mb-5">
              <div className="passport-holder">
                <img src="/idp.jpg" alt="" />
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="row m-0 p-0">
              <div className="col-md-3">
                <label htmlFor="name" className="form-label">
                  Surname
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sname"
                  onChange={handleChange}
                  value={user?.sname}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">
                  Other Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="othername"
                  value={user?.othername}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                  name="email"
                  value={user?.email}
                />
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="nation" className="form-label">
                Nationality
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                id="nationality"
                name="nationality"
                value={user?.nationality}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                id="city"
                name="city"
                value={user?.city}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputState" className="form-label">
                State
              </label>
              <input
                id="state"
                name="state"
                className="form-control"
                onChange={handleChange}
                value={user?.state}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="Date"
                className="form-control"
                onChange={handleChange}
                id="dob"
                name="dob"
                value={user?.dob}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="phone" className="form-label">
                Phone No
              </label>

              <input
                type="tel"
                className="form-control"
                onChange={handleChange}
                name="phone"
                id="phone"
                value={user?.phone}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="height" className="form-label">
                Height
              </label>

              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="height"
                id="height"
                value={user?.height}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="weight" className="form-label">
                Weight
              </label>

              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="weight"
                id="weight"
                value={user?.weight}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>

              <select
                name="gender"
                id="gender"
                className="form-select"
                onChange={handleChange}
                value={user?.gender}
              >
                <option value="">select gnder</option>
                <option value="male">M</option>
                <option value="female">F</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="marital_status" className="form-label">
                Marital Status
              </label>

              <select
                name="marital_status"
                id="marital_status"
                className="form-select"
                onChange={handleChange}
                value={user?.marital_status}
              >
                <option value="">marital status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorce">Divorce</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="marital_status" className="form-label">
                Role
              </label>

              <select
                name="role"
                id="role"
                className="form-select"
                onChange={handleChange}
                value={user?.role}
              >
                <option value="">user role</option>
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                id="address"
                name="address"
                placeholder="1234 Main St"
                value={user?.address}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-lg btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCriminal;
