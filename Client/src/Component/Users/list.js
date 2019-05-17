import React from 'react';
var bgColors = { "Edit": "#339af0",
    "Confirm": "#20c997",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
};
function ListUsers() {
    return (
        <div className="main-content">
            <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="user-data m-b-30">
                                <h3 className="title-3 m-b-30">
                                    <i className="fa fa-user"></i>user data</h3>
                                <div className="filters m-b-45">
                                    <div className="rs-select2--dark rs-select2--md rs-select2--border">
                                        <select className="js-select2" name="property">
                                            <option value="1" selected="selected">Manegemenet</option>
                                            <option value="2">System Engineer</option>
                                            <option value="3">Customer</option>
                                        </select>
                                        <div className="dropDownSelect2"></div>
                                    </div>
                                    <div className="rs-select2--dark rs-select2--md rs-select2--border">
                                        <select className="js-select2 au-select-dark" name="time">
                                            <option value="4" selected="selected">Administrator</option>
                                            <option value="1">Staff</option>
                                            <option value="2">Customer</option>
                                        </select>
                                        <div className="dropDownSelect2"></div>
                                    </div>
                                </div>

                                <div className="table-responsive table-data">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <td>Avatar</td>
                                            <td>user name</td>
                                            <td>full name</td>
                                            <td>position</td>
                                            <td>level</td>
                                            <td>created user</td>
                                            <td>status</td>
                                            <td>action</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <img src="/images/icon/avatar-01.jpg" style={{"width": "50px", "height": "50px"}} />
                                            </td>
                                            <td>Admin</td>
                                            <td>
                                                Admin
                                            </td>
                                            <td>Management</td>
                                            <td>
                                                <span className="role admin">admin</span>
                                            </td>
                                            <td>
                                                Admin
                                            </td>
                                            <td>
                                                <span className="status--process">Ready</span>
                                            </td>
                                            <td>
                                                <a href="edit-user.html">
                                                    <i className="fa fa-edit fa-lg" style={{color: bgColors.Edit}}></i>
                                                </a>&nbsp;
                                                <a href="#" onClick={e =>
                                                    window.confirm("You want to delete this user?") &&
                                                    this.deleteItem(e)
                                                }>
                                                    <i className="fa fa-trash fa-lg" style={{color: bgColors.Red}}></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="/images/icon/avatar-02.jpg" style={{"width": "50px", "height": "50px"}} />
                                            </td>
                                            <td>Linh123</td>
                                            <td>
                                                Linh Nguyen
                                            </td>
                                            <td>Leader</td>
                                            <td>
                                                <span className="role member">member</span>
                                            </td>
                                            <td>
                                                Admin
                                            </td>
                                            <td>
                                                <span className="status--process">Ready</span>
                                            </td>
                                            <td>
                                                <a href="edit-user.html">
                                                    <i className="fa fa-edit fa-lg" style={{color: bgColors.Edit}}></i>
                                                </a>&nbsp;
                                                <a href="#" onClick={e =>
                                                    window.confirm("You want to delete this user?") &&
                                                    this.deleteItem(e)
                                                }>
                                                    <i className="fa fa-trash fa-lg" style={{color: bgColors.Red}}></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="/images/icon/avatar-03.jpg" style={{"width": "50px", "height": "50px"}} />
                                            </td>
                                            <td>Nam</td>
                                            <td>
                                                Nam Duong
                                            </td>
                                            <td>Customer</td>
                                            <td>
                                                <span className="role user">customer</span>
                                            </td>
                                            <td>
                                                Admin
                                            </td>
                                            <td>
                                                <span className="status--denied">Denied</span>
                                            </td>
                                            <td>
                                                <a href={'#'} onClick={e =>
                                                    window.confirm("You want to restock this user?") &&
                                                    this.deleteItem(e)
                                                } style={{color: bgColors.Confirm}}>
                                                    <i className="fa fa-undo fa-lg"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="user-data__footer">
                                    <button className="au-btn au-btn-load">load more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <p>Copyright © 2018 Colorlib. All rights reserved. Template by <a
                                    href="https://colorlib.com">Colorlib</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
}

export default ListUsers;
