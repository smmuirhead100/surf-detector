import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const user = useAuth()['user'];
  console.log(user)
  const location = useLocation();

  return user ? (
    <Outlet /> // Render nested routes for authenticated user
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;