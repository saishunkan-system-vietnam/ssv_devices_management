import React from 'react';
import { Link } from 'react-router-dom'

function HeaderDesktop() {
    return (
        <header className="header-desktop">
            <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <div className="header-wrap">
                        <form className="form-header" action="" method="POST">
                            <input className="au-input au-input--xl" type="text" name="search"
                                placeholder="Search for datas &amp; reports..." />
                            <button className="au-btn--submit" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <div className="header-button">
                            <div className="noti-wrap">
                                <div className="noti__item js-item-menu">
                                    <i className="zmdi zmdi-comment-more"></i>
                                    <span className="quantity">1</span>
                                    <div className="mess-dropdown js-dropdown">
                                        <div className="mess__title">
                                            <p>You have 2 news message</p>
                                        </div>
                                        <div className="mess__item">
                                            <div className="image img-cir img-40">
                                                <img src="../../../images/icon/avatar-06.jpg" alt="Michelle Moreno" />
                                            </div>
                                            <div className="content">
                                                <h6>Michelle Moreno</h6>
                                                <p>Have sent a photo</p>
                                                <span className="time">3 min ago</span>
                                            </div>
                                        </div>
                                        <div className="mess__item">
                                            <div className="image img-cir img-40">
                                                <img src="../../../images/icon/avatar-04.jpg" alt="Diane Myers" />
                                            </div>
                                            <div className="content">
                                                <h6>Diane Myers</h6>
                                                <p>You are now connected on message</p>
                                                <span className="time">Yesterday</span>
                                            </div>
                                        </div>
                                        <div className="mess__footer">
                                            <Link to={"/"}>View all messages</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="noti__item js-item-menu">
                                    <i className="zmdi zmdi-email"></i>
                                    <span className="quantity">1</span>
                                    <div className="email-dropdown js-dropdown">
                                        <div className="email__title">
                                            <p>You have 3 New Emails</p>
                                        </div>
                                        <div className="email__item">
                                            <div className="image img-cir img-40">
                                                <img src="../../../images/icon/avatar-06.jpg" alt="Cynthia Harvey" />
                                            </div>
                                            <div className="content">
                                                <p>Meeting about new dashboard...</p>
                                                <span>Cynthia Harvey, 3 min ago</span>
                                            </div>
                                        </div>
                                        <div className="email__item">
                                            <div className="image img-cir img-40">
                                                <img src="../../../images/icon/avatar-05.jpg" alt="Cynthia Harvey" />
                                            </div>
                                            <div className="content">
                                                <p>Meeting about new dashboard...</p>
                                                <span>Cynthia Harvey, Yesterday</span>
                                            </div>
                                        </div>
                                        <div className="email__item">
                                            <div className="image img-cir img-40">
                                                <img src="../../../images/icon/avatar-04.jpg" alt="Cynthia Harvey" />
                                            </div>
                                            <div className="content">
                                                <p>Meeting about new dashboard...</p>
                                                <span>Cynthia Harvey, April 12,,2018</span>
                                            </div>
                                        </div>
                                        <div className="email__footer">
                                            <Link to={"/"}>See all emails</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="noti__item js-item-menu">
                                    <i className="zmdi zmdi-notifications"></i>
                                    <span className="quantity">3</span>
                                    <div className="notifi-dropdown js-dropdown">
                                        <div className="notifi__title">
                                            <p>You have 3 Notifications</p>
                                        </div>
                                        <div className="notifi__item">
                                            <div className="bg-c1 img-cir img-40">
                                                <i className="zmdi zmdi-email-open"></i>
                                            </div>
                                            <div className="content">
                                                <p>You got a email notification</p>
                                                <span className="date">April 12, 2018 06:50</span>
                                            </div>
                                        </div>
                                        <div className="notifi__item">
                                            <div className="bg-c2 img-cir img-40">
                                                <i className="zmdi zmdi-account-box"></i>
                                            </div>
                                            <div className="content">
                                                <p>Your account has been blocked</p>
                                                <span className="date">April 12, 2018 06:50</span>
                                            </div>
                                        </div>
                                        <div className="notifi__item">
                                            <div className="bg-c3 img-cir img-40">
                                                <i className="zmdi zmdi-file-text"></i>
                                            </div>
                                            <div className="content">
                                                <p>You got a new file</p>
                                                <span className="date">April 12, 2018 06:50</span>
                                            </div>
                                        </div>
                                        <div className="notifi__footer">
                                            <Link to={"/"}>All notifications</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="account-wrap">
                                <div className="account-item clearfix js-item-menu">
                                    <div className="image">
                                        <img src="../../../images/icon/avatar-01.jpg" alt="John Doe" />
                                    </div>
                                    <div className="content">
                                        <Link className="js-acc-btn" to={"/"}>john doe</Link>
                                    </div>
                                    <div className="account-dropdown js-dropdown">
                                        <div className="info clearfix">
                                            <div className="image">
                                                <Link to={"/"}>
                                                    <img src="../../../images/icon/avatar-01.jpg" alt="John Doe" />
                                                </Link>
                                            </div>
                                            <div className="content">
                                                <h5 className="name">
                                                    <Link to={"/"}>john doe</Link>
                                                </h5>
                                                <span className="email">johndoe@example.com</span>
                                            </div>
                                        </div>
                                        <div className="account-dropdown__body">
                                            <div className="account-dropdown__item">
                                                <Link to={"/"}>
                                                    <i className="zmdi zmdi-account"></i>Account</Link>
                                            </div>
                                            <div className="account-dropdown__item">
                                                <Link to={"/"}>
                                                    <i className="zmdi zmdi-settings"></i>Setting</Link>
                                            </div>
                                            <div className="account-dropdown__item">
                                                <Link to={"/"}>
                                                    <i className="zmdi zmdi-money-box"></i>Billing</Link>
                                            </div>
                                        </div>
                                        <div className="account-dropdown__footer">
                                            <Link to={"/"}>
                                                <i className="zmdi zmdi-power"></i>Logout</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default HeaderDesktop;
