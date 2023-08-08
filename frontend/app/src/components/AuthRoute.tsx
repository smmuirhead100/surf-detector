import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from 'react'

const AuthRoute = () => {
  const user = useAuth()['user'];
  const location = useLocation();

  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      checkUserAccess(user.id);
    } else {
      setIsLoading(false)
    }
  }, [user]);
  
  const checkUserAccess = async (userId) => {
    const { data, error } = await supabase
      .from("UserAccess")
      .select("approved")
      .eq("user_id", userId)
      .single();
    console.log('first' + data.approved)
    if (data) {
      console.log('updating isApproved')
      setIsApproved(data.approved);
    } else {
      console.log(error)
    }
    setIsLoading(false)
  };

  return isLoading ? (
    <div>loading</div>
  ) : 
  isApproved ? (
    <Outlet /> // Render nested routes for approved user
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
