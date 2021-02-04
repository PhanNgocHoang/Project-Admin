import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginComponent } from "../components/login";
import Alert from "react-s-alert";
export const LoginPage = () => {
  const fetchMeApiData = useAuth();
  const user = useSelector((state) => {
    return state.login.data;
  });
  if (fetchMeApiData.loading) {
    return <div>Authenticating...</div>;
  }
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <LoginComponent />
    </div>
  );
};
