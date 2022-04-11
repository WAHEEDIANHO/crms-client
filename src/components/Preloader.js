import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Preloader() {
  const { pathname } = useLocation();

  console.log(pathname);

  useEffect(() => {
    if (pathname === "/") {
      setTimeout(() => {
        document.querySelector(".preloader").style.transform =
          "translateY(-100%)";
      }, 10000);
    }
  });

  if (pathname !== "/") return null;
  return (
    <div className="preloader">
      <div className="overlay"></div>
      <h1 className="text-center mb-4 text-white">
        Design and Implementation of <em>Criminal Management System</em>
      </h1>
      <h4 className="text-center">
        Design By:{" "}
        <strong className="text-muted ">GBADEGESHIN KAYODE KUNLE</strong>
      </h4>
      <h3 className="mt-3 text-white text-center">HC20190106303</h3>

      <h5 className="mt-3">Supervised By</h5>
      <h3 className="text-white">MR CHRIS</h3>
    </div>
  );
}

export default Preloader;
