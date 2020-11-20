import React from 'react';
import { Link} from 'react-router-dom'
import {AdminRouteComponent} from './router'
export const HeaderComponent = () => {
    return (
      <div id="right-panel" className="right-panel">
        <header id="header" className="header">
  <div className="top-left">
    <div className="navbar-header">
      <Link  to="/" className="navbar-brand" ><img src="images/e-library.png" alt="Logo" style ={{width:'26%', height:'20%'}} /></Link>
      <Link to="/" className="navbar-brand hidden" ><img src="images/logo2.png" alt="Logo" /></Link >
      <Link to="#" id="menuToggle" className="menutoggle"><i className="fa fa-bars" /></Link >
    </div>
  </div>
  <div className="top-right">
    <div className="header-menu">
      <div className="header-left">
        <button className="search-trigger"><i className="fa fa-search" /></button>
        <div className="form-inline">
          <form className="search-form">
            <input className="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search" />
            <button className="search-close" type="submit"><i className="fa fa-close" /></button>
          </form>
        </div>
        <div className="dropdown for-notification">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-bell" />
            <span className="count bg-danger">3</span>
          </button>
          <div className="dropdown-menu" aria-labelledby="notification">
            <p className="red">You have 3 Notification</p>
            <Link to="/index" className="dropdown-item media" >
              <i className="fa fa-check" />
              <p>Server #1 overloaded.</p>
            </Link >
            <Link to="/index" className="dropdown-item media" >
              <i className="fa fa-info" />
              <p>Server #2 overloaded.</p>
            </Link >
            <Link to="/index" className="dropdown-item media" >
              <i className="fa fa-warning" />
              <p>Server #3 overloaded.</p>
            </Link >
          </div>
        </div>
        <div className="dropdown for-message">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="message" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-envelope" />
            <span className="count bg-primary">4</span>
          </button>
          <div className="dropdown-menu" aria-labelledby="message">
            <p className="red">You have 4 Mails</p>
            <Link to="/index" className="dropdown-item media" >
              <span className="photo media-left"><img alt="avatar" src="images/avatar/1.jpg" /></span>
              <div className="message media-body">
                <span className="name float-left">Jonathan Smith</span>
                <span className="time float-right">Just now</span>
                <p>Hello, this is an example msg</p>
              </div>
            </Link >
            <Link to="/index" className="dropdown-item media" >
              <span className="photo media-left"><img alt="avatar" src="images/avatar/2.jpg" /></span>
              <div className="message media-body">
                <span className="name float-left">Jack Sanders</span>
                <span className="time float-right">5 minutes ago</span>
                <p>Lorem ipsum dolor sit amet, consectetur</p>
              </div>
            </Link >
            <Link to="/index" className="dropdown-item media" >
              <span className="photo media-left"><img alt="avatar" src="images/avatar/3.jpg" /></span>
              <div className="message media-body">
                <span className="name float-left">Cheryl Wheeler</span>
                <span className="time float-right">10 minutes ago</span>
                <p>Hello, this is an example msg</p>
              </div>
            </Link >
            <Link to="/index" className="dropdown-item media" >
              <span className="photo media-left"><img alt="avatar" src="images/avatar/4.jpg" /></span>
              <div className="message media-body">
                <span className="name float-left">Rachel Santos</span>
                <span className="time float-right">15 minutes ago</span>
                <p>Lorem ipsum dolor sit amet, consectetur</p>
              </div>
            </Link >
          </div>
        </div>
      </div>
      <div className="user-area dropdown float-right">
        <Link  to="/index"className="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img className="user-avatar rounded-circle" src="images/admin.jpg" alt="User Avatar" />
        </Link >
        <div className="user-menu dropdown-menu">
          <Link to="/index" className="nav-link" ><i className="fa fa- user" />My Profile</Link >
          <Link to="/index" className="nav-link" ><i className="fa fa- user" />Notifications <span className="count">13</span></Link >
          <Link to="/index" className="nav-link" ><i className="fa fa -cog" />Settings</Link >
          <Link to="/index" className="nav-link" ><i className="fa fa-power -off" />Logout</Link >
        </div>
      </div>
    </div>
  </div>
</header>
      <AdminRouteComponent/>
    <div className="clearfix" />
  <footer className="site-footer">
    <div className="footer-inner bg-white">
      <div className="row">
        <div className="col-sm-6">
          Copyright © 2018 Ela Admin
        </div>
        <div className="col-sm-6 text-right">
          Designed by <a href="https://colorlib.com">Colorlib</a>
        </div>
      </div>
    </div>
  </footer>
</div>
    )
}