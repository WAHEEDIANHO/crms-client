import Carousel from "../components/Carousel";
import Criminals from "../components/Criminals";

function Home() {
  // if (!sessionStorage.getItem("token")) return <Navigate to="/login" />;

  return (
    <header className="w-100">
      <Carousel />
      <Criminals filter={true} title="Wanted" />
    </header>
  );
}

export default Home;
