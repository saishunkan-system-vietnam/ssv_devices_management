import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMobile() {
    return (
        <header className="header-mobile d-block d-lg-none">
            <div className="header-mobile__bar">
                <div className="container-fluid">
                    <div className="header-mobile-inner">
                        <Link className="logo" to="index.html">
                            <img src="../../../images/icon/logo.png" alt="CoolAdmin" />
                        </Link>
                        <button className="hamburger hamburger--slider" type="button">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <nav className="navbar-mobile">
                <div className="container-fluid">
                    <ul className="navbar-mobile__list list-unstyled">
                        <li className="active">
                            <Link to="index.html">
                                <i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="category.html">
                                <i className="fas fa-chart-bar"></i>Category</Link>
                        </li>
                        <li>
                            <Link to="device.html">
                                <i className="fas fa-table"></i>Devices</Link>
                        </li>
                        <li>
                            <Link to="borrow.html">
                                <i className="fas fa-chart-bar"></i>Borrow Device</Link>
                        </li>
                        <li>
                            <Link to="brand.html">
                                <i className="far fa-check-square"></i>Brand</Link>
                        </li>
                        <li>
                            <Link to="user.html">
                                <i className="fas fa-user"></i>User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default HeaderMobile;