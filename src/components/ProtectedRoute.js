import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
