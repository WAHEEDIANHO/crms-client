import { useLocation, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import AddCriminal from "./views/AddCriminal";
import AddUser from "./views/AddUser";
import Criminals from "./views/Criminals";
import CriminalProfile from "./views/CriminalProfile";
import StaffReport from "./views/StaffReport";
import CriminalReport from "./views/CriminalReport";
import Staff from "./views/Staff";
import UserProfile from "./views/UserProfile";

function Layout({ token, api }) {
  const { pathname } = useLocation();
  const { id } = useParams();

  const render = () => {
    console.log("from render", pathname);
    let page;
    switch (pathname) {
      case "/dashboard":
        page = <Home />;
        break;

      case "/dashboard/add-user":
        page = <AddUser title={"User"} api={api} />;
        break;

      // Criminal route
      case "/dashboard/add_criminal":
        page = <AddCriminal api={api} />;
        break;
      case "/dashboard/criminal":
        page = <Criminals api={api} />;
        break;
      case `/dashboard/criminal/${id}`:
        page = <CriminalProfile api={api} id={id} />;
        break;
      case "/dashboard/criminals_report":
        page = <CriminalReport api={api} />;
        break;

      // Staff route
      case "/dashboard/add-staff":
        page = <AddUser title={"Staff"} api={api} />;
        break;
      case "/dashboard/staff":
        page = <Staff api={api} />;
        break;
      case `/dashboard/user/${id}`:
        page = <UserProfile api={api} id={id} />;
        break;

      case "/dashboard/staff_report":
        page = <StaffReport api={api} />;
        break;

      default:
        page = (
          <h2 className="text-danger text-center">
            Oops!!! There is nothing here: 404!
          </h2>
        );
        break;
    }

    return page;
  };

  return (
    <div className="section">
      <Navbar />
      {render()}
    </div>
  );
}

export default Layout;
