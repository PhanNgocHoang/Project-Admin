import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginComponent } from "../components/login";
export const LoginPage = () => {
  useAuth();
  const user = useSelector((state) => {
    return state.login.data;
  });
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <LoginComponent />
    </div>
  );
};
