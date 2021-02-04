import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthUserCtx } from "../context/auth";
import { Redirect } from "react-router-dom";
import { LoginComponent } from "../components/login";
export const LoginPage = () => {
  const fetchMeApiData = useAuth();
  const { authUser } = useContext(AuthUserCtx);
  if (fetchMeApiData.loading) {
    return <div>Authenticating...</div>;
  }
  if (authUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <LoginComponent />
    </div>
  );
};
