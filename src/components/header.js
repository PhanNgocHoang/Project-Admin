import React from "react";
import { Link } from "react-router-dom";
import { AdminRouteComponent } from "./router";
export const HeaderComponent = (props) => {
  const logout = function () {
    localStorage.removeItem("token");
    return (window.location = "/login");
  };
  return (
    <div id="right-panel" className="right-panel">
      <header id="header" className="header">
        <div className="top-left">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img
                src="https://res.cloudinary.com/dps6fac1c/image/upload/v1613621648/images/e-library_uxmixc.png"
                alt="Logo"
                style={{ width: "26%", height: "20%" }}
              />
            </Link>
            <Link to="/" className="navbar-brand hidden">
              <img
                src="https://res.cloudinary.com/dps6fac1c/image/upload/v1613621648/images/e-library_uxmixc.png"
                alt="Logo"
              />
            </Link>
            <Link to="#" id="menuToggle" className="menutoggle">
              <i className="fa fa-bars" />
            </Link>
          </div>
        </div>
        <div className="top-right">
          <div className="header-menu">
            <div className="user-area dropdown float-right">
              <Link
                to="#"
                className="dropdown-toggle active"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="user-avatar rounded-circle"
                  alt="User Avatar"
                  src={props.user.photoUrl}
                />
              </Link>
              <div className="user-menu dropdown-menu">
                <Link to="/index" className="nav-link">
                  <i className="fa fa- user" />
                  My Profile
                </Link>
                <Link to="#" className="nav-link" onClick={logout}>
                  <i className="fa fa-power -off" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AdminRouteComponent />
      <div className="clearfix" />
      <footer className="site-footer">
        <div className="footer-inner bg-white">
          <div className="row">
            <div className="col-sm-6">Copyright © 2018 Ela Admin</div>
            <div className="col-sm-6 text-right">
              Designed by <a href="https://colorlib.com">Colorlib</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
