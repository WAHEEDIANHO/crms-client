import { useEffect } from "react";
import Menu from "./Menu";

import "../css/nav.css";
import { Link } from "react-router-dom";

function Navbar({ type }) {
  useEffect(function () {
    const nav = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        nav.classList.add("border-bottom");
        const navbar_height = document.querySelector(".navbar").offsetHeight;
        // document.body.style.paddingTop = navbar_height + "px";
      } else {
        nav.classList.remove("border-bottom");
      }
    });
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="text-success display-6">
            <img src="/prison.png" width="50" height="50" alt="logo" /> CRMS
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="me-auto mb-2 mb-lg-0"></div>
          <div className="d-flex">
            <Menu type={type} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
