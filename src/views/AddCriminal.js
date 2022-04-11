import { useState, useEffect } from "react";
import FormData from "form-data";
import axios from "axios";
import "../css/login.css";
import Loader from "../components/Loader";

import Guide from "../components/Guide";

function AddCriminal({ api }) {
  const [file, setFile] = useState(null);
  const [criminal, setCriminal] = useState({});
  const [loader, setLoader] = useState(false);
  const [criminal_id, setCriminalID] = useState();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${api}/criminal`, {
        headers: {
          authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const { data } = res.data;
      setCriminalID(`CRMS${(data.length + 1).toString().padStart(3, 0)}`);
      // return data.length;
    })();
  });

  const addCriminal = (e) => {
    e.preventDefault();
    setLoader(true);
    // console.log(JSON.stringify(criminal));

    // console.log(file);
    const data = new FormData();
    data.append("criminal_id", criminal_id);
    data.append("file", file);

    // console.log(Object.entries(criminal).length);
    for (const [name, value] of Object.entries(criminal)) {
      data.append(name, value);
    }

    axios
      .post(`${api}/criminal`, data, {
        "Content-Type": "multipart/form-data",
        headers: {
          authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCriminal({
          address: "",
          city: "",
          crime: "",
          dob: "",
          dod: "",
          dos: "",
          email: "",
          gender: "",
          height: "",
          marital_status: "",
          nationality: "",
          nok_name: "",
          nok_no: "",
          nok_rel: "",
          officer: "",
          othername: "",
          phone: "",
          sentence_duration: "",
          sname: "",
          state: "",
          weight: "",
        });
        setLoader(false);
      })
      .catch((err) => {
        alert("oops! error while submitting form \n please try again");
        setLoader(false);
      });
  };

  const handleChange = (e) =>
    setCriminal({
      ...criminal,
      [e.target.name]: e.target.value,
    });

  return (
    <>
      {loader ? <Loader /> : null}

      <div className="container-fluid">
        <Guide>
          <h3>
            Add Criminal into <strong>CRMS</strong>
          </h3>
          <p className="mb-4">Crime Managemen System</p>
        </Guide>
        {/* onSubmit={submit} */}
        <div className="container">
          <form className="row g-3" onSubmit={addCriminal}>
            <div className="row align-items-center mb-5">
              <div className="col-md-6">
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

              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Criminal ID
                </label>
                <input
                  disabled
                  type="text"
                  name="file"
                  className="form-control my-auto my-auto"
                  value={criminal_id ? criminal_id : ""}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <label htmlFor="name" className="form-label">
                  Surname
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sname"
                  onChange={handleChange}
                  value={criminal?.sname}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">
                  Other Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="othername"
                  onChange={handleChange}
                  value={criminal?.othername}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  value={criminal?.email}
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
                id="nation"
                name="nationality"
                onChange={handleChange}
                value={criminal?.nationality}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                onChange={handleChange}
                value={criminal?.state}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                onChange={handleChange}
                value={criminal?.city}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="Date"
                className="form-control"
                id="dob"
                name="dob"
                onChange={handleChange}
                value={criminal?.dob}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="phone" className="form-label">
                Phone No
              </label>

              <input
                type="tel"
                className="form-control"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={criminal?.phone}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="height" className="form-label">
                Height
              </label>

              <input
                type="number"
                className="form-control"
                name="height"
                id="height"
                onChange={handleChange}
                value={criminal?.height}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="weight" className="form-label">
                Weight
              </label>

              <input
                type="number"
                className="form-control"
                name="weight"
                id="weight"
                onChange={handleChange}
                value={criminal?.weight}
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
                value={criminal?.gender}
              >
                <option value="">select gender</option>
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
                value={criminal?.marital_status}
              >
                <option value="">Marital status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorce">Divorce</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="crime" className="form-label">
                Crime
              </label>

              <input
                type="text"
                className="form-control"
                name="crime"
                id="crime"
                onChange={handleChange}
                value={criminal?.crime}
              />
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="1234 Main St"
                onChange={handleChange}
                value={criminal?.address}
              />
            </div>

            <div className="col-12">
              <label htmlFor="officer" className="form-label">
                Officer in Charge
              </label>
              <input
                type="text"
                className="form-control"
                id="officer"
                name="officer"
                onChange={handleChange}
                value={criminal?.officer}
              />
            </div>

            <div className="col-4">
              <label htmlFor="sentence_duration" className="form-label">
                Duration of Sentence
              </label>
              <input
                type="text"
                className="form-control"
                id="sentence_duration"
                name="sentence_duration"
                onChange={handleChange}
                value={criminal?.sentence_duration}
              />
            </div>

            <div className="col-4">
              <label htmlFor="dos" className="form-label">
                Date of Sentence
              </label>
              <input
                type="date"
                className="form-control"
                id="dos"
                name="dos"
                onChange={handleChange}
                value={criminal?.dos}
              />
            </div>

            <div className="col-4">
              <label htmlFor="dod" className="form-label">
                Date of Discharge
              </label>
              <input
                type="date"
                className="form-control"
                id="dod"
                name="dod"
                onChange={handleChange}
                value={criminal?.dod}
              />
            </div>

            <h3 className="mt-5">Next of Kin Info</h3>
            <div className="divider"></div>
            <div className="row">
              <div className="col-12 mb-2">
                <label htmlFor="nok_name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nok_name"
                  name="nok_name"
                  onChange={handleChange}
                  value={criminal?.nok_name}
                />
              </div>

              <div className="col-6">
                <label htmlFor="nok_no" className="form-label">
                  Phone No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nok_no"
                  name="nok_no"
                  onChange={handleChange}
                  value={criminal?.nok_no}
                />
              </div>

              <div className="col-6">
                <label htmlFor="nok_rel" className="form-label">
                  Relationship
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nok_rel"
                  name="nok_rel"
                  onChange={handleChange}
                  value={criminal?.nok_rel}
                />
              </div>
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
