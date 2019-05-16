import React from 'react';

function HeaderMobile() {
    return (
    <header className="header-mobile d-block d-lg-none">
        <div className="header-mobile__bar">
            <div className="container-fluid">
                <div className="header-mobile-inner">
                    <a className="logo" href="index.html">
                        <img src="../../../images/icon/logo.png" alt="CoolAdmin"/>
                    </a>
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
                        <a href="index.html">
                            <i className="fas fa-tachometer-alt"></i>Dashboard</a>
                    </li>
                    <li>
                        <a href="category.html">
                            <i className="fas fa-chart-bar"></i>Category</a>
                    </li>
                    <li>
                        <a href="device.html">
                            <i className="fas fa-table"></i>Devices</a>
                    </li>
                    <li>
                        <a href="borrow.html">
                            <i className="fas fa-chart-bar"></i>Borrow Device</a>
                    </li>
                    <li>
                        <a href="brand.html">
                            <i className="far fa-check-square"></i>Brand</a>
                    </li>
                    <li>
                        <a href="user.html">
                            <i className="fas fa-user"></i>User</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    )
}

export default HeaderMobile;