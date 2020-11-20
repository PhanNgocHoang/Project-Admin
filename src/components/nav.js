import React from 'react';
import { NavLink } from 'react-router-dom'
export const NavComponent = () => {
    return (
        <aside id="left-panel" className="left-panel">
            <nav className="navbar navbar-expand-sm navbar-default">
                <div id="main-menu" className="main-menu collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li className="active">
                            <NavLink to="/"><i className="menu-icon fa fa-laptop" />Dashboard </NavLink>
                        </li>
                        <li className="menu-title">Book Management</li>
                        <li className="menu-item-has-children dropdown">
                            <NavLink to="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className=" menu-icon fa fa-book"/>Books</NavLink>
                            <ul className="sub-menu children dropdown-menu">
                                <li><i className="fa fa-table" /><NavLink to="/typesbook" >Types Book</NavLink></li>
                                <li><i className="fa fa-table" /><NavLink to="/books">Books</NavLink></li>
                            </ul>
                        </li>
                        <li className="menu-item-has-children">
                            <NavLink to="/authors"> <i className="menu-icon fa fa-pencil-square" />Authors</NavLink>
                        </li>
                        <li className="menu-item-has-children ">
                            <NavLink to="/publishers" > <i className="menu-icon fa fa-newspaper-o" />Publisher</NavLink >
                        </li>
                        <li className="menu-title">User</li>{/* /.menu-title */}
                        <li className="menu-item-has-children dropdown">
                            <NavLink to="/index" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-user-secret" />Admin</NavLink >
                            <NavLink to="/index" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-users" />Customer</NavLink >
                        </li>
                        <li className="menu-title">Banner</li>{/* /.menu-title */}
                        <li className="menu-item-has-children dropdown">
                            <NavLink to="/index" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-picture-o" />Pages</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}