import { useAuth } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";
import Home from "../pages/home/home"
import { useState, useEffect } from 'react';
import SignIn from "../pages/signup_signin/signin";

const AuthRoute = () => {
  const user = useAuth()['user'];
  const isApproved = useAuth()['isApproved']
  const isLoading = useAuth()['isLoading']

  return isLoading ? (
    <div>Loading</div>
  ) : user ? (
    isApproved ? (
      <Outlet /> // Render nested routes for approved user
    ) : (
      <Outlet />
    )
  ) : (
    <Home />
  );
};

export default AuthRoute;
