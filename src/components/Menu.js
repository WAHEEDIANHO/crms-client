// import { useState } from "react";
import { Link } from "react-router-dom";

function Menu({ type }) {
  // const [token, setToken] = useState(() =>
  // sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
  // );

  const generalMenu = [
    { title: "HOME", path: "/" },
    { title: "ALL CRIMINALS", path: "/criminals" },
    { title: type ? "LOGOUT" : "LOGIN", path: type ? "/logout" : "login" },
    { title: "CONTACT US", path: "/contact" },
  ];

  const adminMenu = [
    ...generalMenu,
    { title: "DASHBOARD", path: "/dashboard" },
    {
      title: "ADMINISTRATION",
      path: "#",
      role: [
        { title: "ADD POLICE", path: "/add_police" },
        { title: "ADD CRIME", path: "/add_crime" },
        { title: "ADD CRIMINAL", path: "/add_criminal" },
        { title: "ADD COURT", path: "/add_court" },
        { title: "ADD PRISON", path: "/add_prison" },
      ],
    },
    {
      title: "REPORT",
      path: "/report",
      role: [
        { title: "CRIME REPORT", path: "/crime" },
        { title: "CRIMINAL REPORT", path: "criminal" },
        { title: "COURT REPORT", path: "/court" },
        { title: "PRISON REPORT", path: "/prison" },
        { title: "COURT REPORT", path: "/court" },
      ],
    },
    { title: "CHANGE PASSWORD", path: "/change_password" },
  ];

  const policeMenu = [
    ...generalMenu,
    { title: "DASHBOARD", path: "/dashboard" },
    { title: "MY ACCOUNT", path: "#" },
    {
      title: "ADMINISTRATION",
      path: "#",
      role: [
        { title: "ADD CRIME", path: "/add_crime" },
        { title: "ADD CRIMINAL", path: "/add_criminal" },
      ],
    },
    {
      title: "REPORT",
      path: "/report",
      role: [
        { title: "CRIME REPORT", path: "/crime" },
        { title: "CRIMINAL REPORT", path: "criminal" },
      ],
    },
    { title: "CHANGE PASSWORD", path: "/change_password" },
  ];

  const getDisplayMenu = (menuType) => {
    return menuType.map((el, i) => {
      if (el.role) {
        return (
          <li className="nav-item dropdown" key={i}>
            <Link
              className="nav-link dropdown-toggle"
              to={"#"}
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {el.title}
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {el.role.map((el, i) => (
                <li key={i}>
                  <Link className="dropdown-item" to={el.path}>
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={i}>
            <Link to={el.path} className="nav-link active" aria-current="page">
              {el.title}
            </Link>
          </li>
        );
      }
    });
  };

  const navigation = (type) => {
    let menu;
    switch (type) {
      case "admin":
        menu = getDisplayMenu(adminMenu);
        break;
      case "police":
        menu = getDisplayMenu(policeMenu);
        break;
      default:
        menu = getDisplayMenu(generalMenu);
        break;
    }
    return menu;
  };

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">{navigation(type)}</ul>
  );
}

export default Menu;
