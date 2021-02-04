import React, { useContext } from "react";
import { NavComponent } from "../components/nav";
import { HeaderComponent } from "../components/header";
import { Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import { useAuth } from "../hooks/useAuth";
import { AuthUserCtx } from "../context/auth";
export const PageIndex = () => {
  const { authUser } = useContext(AuthUserCtx);
  const fetchMeApiData = useAuth();
  if (fetchMeApiData.loading) {
    return <div>Authenticating...</div>;
  }
  if (fetchMeApiData.error) {
    return <Redirect to="/login" />;
  }
  if (!authUser) {
    return null;
  }
  return (
    <div>
      <Alert stack={{ limit: 3 }} />
      <NavComponent />
      <HeaderComponent user={authUser}></HeaderComponent>
    </div>
  );
};
