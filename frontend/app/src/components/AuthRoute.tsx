import { useAuth } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";
import Home from "../pages/home/home";

const AuthRoute = () => {
  const user = useAuth()['user'];
  const isLoading = useAuth()['isLoading']
  console.log(user)

  return isLoading ? (
    <div>Loading</div>
  ) : user ?
      <Outlet />
        :
      <Home />
};

export default AuthRoute;
