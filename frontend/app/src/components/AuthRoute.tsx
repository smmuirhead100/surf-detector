import { useAuth } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from 'react'
import SignIn from "./signin";

const AuthRoute = () => {
  const user = useAuth()['user'];

  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    if (data) {
      console.log('updating aprpoved' + data.approved)
      setIsApproved(data.approved);
    } else {
      console.log('User has not been authenticated.')
      console.log(error)
    }
    setIsLoading(false)
  };
  isApproved ? console.log('isapproved!!') : console.log('is not approved')
  return isLoading ? (
    <div>loading</div>
  ) : 
  isApproved ? (
    <Outlet /> // Render nested routes for approved user
  ) : (
    <SignIn errorMsg="User is not authenticated"/>
  );
};

export default AuthRoute;
