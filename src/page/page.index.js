import React from "react";
import { NavComponent } from "../components/nav";
import { HeaderComponent } from "../components/header";
import { Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { Dashboard } from "../components/dashbroad/dashboard";
export const PageIndex = () => {
  const user = useSelector((state) => {
    return state.login.data;
  });
  const fetchMeApiData = useAuth();
  if (fetchMeApiData.error) {
    return <Redirect to="/login" />;
  }
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Alert stack={{ limit: 3 }} />
      <NavComponent />
      <HeaderComponent user={user}></HeaderComponent>
    </div>
  );
};
