import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const user = useAuth()['user'];
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;