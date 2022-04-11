import { Navigate } from "react-router-dom";

import Carousel from "../components/Carousel";
import Criminals from "./Criminals";

function Home() {
  if (!sessionStorage.getItem("token")) return <Navigate to="/" />;

  return (
    <header className="w-100">
      <Carousel />
      <Criminals filter={true} title="Wanted Criminals" />
    </header>
  );
}

export default Home;
