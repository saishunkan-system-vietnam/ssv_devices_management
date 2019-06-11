import React from 'react';

function MenuSidebar() {
    return (

        <aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
                <a href="brand.html">
                    <img src="../../../images/icon/logo.png" alt="Cool Admin" />
                </a>
            </div>
            <div className="menu-sidebar__content js-scrollbar1">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
                        <li className="active">
                            <a className="js-arrow" href={'/dashboard'}>
                                <i className="fas fa-tachometer-alt"></i>Dashboard</a>
                        </li>
                        <li>
                            <a href={'/categories'}>
                                <i className="fas fa-chart-bar"></i>Category</a>
                        </li>
                        <li>
                            <a href={'/devices'}>
                                <i className="fas fa-table"></i>Devices</a>
                        </li>
                        <li>
                            <a href={'/borrow'}>
                                <i className="fas fa-chart-bar"></i>Borrow Device</a>
                        </li>
                        <li>
                            <a href={'/brand'}>
                                <i className="far fa-check-square"></i>Brand</a>
                        </li>
                        <li>
                            <a href={'/maintenance'}>
                                <i className="fab fa-accessible-icon"></i>Maintenance</a>
                        </li>
                        <li>
                            <a href={'/user'}>
                                <i className="fas fa-user"></i>User</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default MenuSidebar;
