import React, { useState, useEffect } from 'react';
import LstUsers from '../../../api/listusers';
import Restock from '../../../api/restock';
import DeleteUser from '../../../api/delete_user';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useAlert } from "react-alert";
import { BehaviorSubject } from 'rxjs';

var bgColors = {
    "Edit": "#339af0",
    "Confirm": "#20c997",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Yellow": "#F6BB42",
};


function ListUsers(props) {
    const alert = useAlert();
    const [lstUsers, setLstUsers] = useState([]);
    const [baseUrl, setBaseUrl] = useState([]);
    //get data local Storage
    const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('newUser')));

    function handleGetLstUsers() {
        LstUsers.LstUsers().then(responseJson => {
            console.log(responseJson);
            setLstUsers(responseJson['payload']['lstUser']);
            setBaseUrl(responseJson['payload']['baseUrl']);
        });
    }
    useEffect(() => {
        if (lstUsers.length == 0) {
            handleGetLstUsers();
        }
    });

    function handleRestockUser(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to restock this user?</p>
                        <button onClick={() => Restock.restock(id).then(responseJson => {
                            if (responseJson['0'] === 200) {
                                alert.success("The user has been restock!");
                                onClose();
                                handleGetLstUsers();
                            } else {
                                alert.error("The user could not be restock. Please, try again.");
                                onClose();
                                handleGetLstUsers();
                            }
                        })}>Yes, Restock user!</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }

    function handleDeletedUser(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this user?</p>
                        <button onClick={() => DeleteUser.delete_user(id).then(responseJson => {
                            if (responseJson['0'] === 200) {
                                alert.success("The user has been delete!");
                                onClose();
                                handleGetLstUsers();
                            } else {
                                alert.error("The user could not be delete. Please, try again.");
                                onClose();
                                handleGetLstUsers();
                            }
                        })}>Yes, Delete user!</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }

    function getPosition(position) {
        if (position == 1) {
            return <span className="role member">Programmer</span>;
        } else if (position == 2) {
            return <span className="role user">Leader Project</span>;
        } else if (position == 3) {
            return <span className="role account">Accounting</span>;
        } else if (position == 4) {
            return <span className="role admin">Administrator</span>;
        } else if (position == 5) {
            return <span className="role manager">Project Manager</span>;
        }
    }

    function getStatus(status) {
        if (status == 0) {
            return <span className="status--process">Ready</span>;
        } else if (status == 1) {
            return <span className="status--denied">Denied</span>
        }
    }

    function getAction(status, id) {
        if (status == 0) {
            return <div>
                <i onClick={props.set_show(3, id)} className="fa fa-edit fa-lg" style={{ color: bgColors.Edit }}></i>
                <span onClick={(event) => {
                    handleDeletedUser(id);
                }} style={{ 'cursor': 'pointer' }}>
                    <i className="fa fa-trash fa-lg" style={{ color: bgColors.Red }}></i>
                </span></div>;
        }
    }

    function getRestock(status, id) {
        if (status == 1) {
            return <span onClick={(event) => {
                handleRestockUser(id);
            }} style={{ 'color': bgColors.Confirm, 'cursor': 'pointer' }}>
                <i className="fa fa-undo fa-lg"></i>
            </span>;
        }
    }

    function imgUser(baseUrl, img) {
        if (img) {
            var url = baseUrl + '/' + img;
            return <img src={url} style={{ "width": "70px", "height": "70px", 'max-width': '70px', 'padding': '4px' }} />;
        } else {
            var baseUrl = baseUrl + "/img/not-available.jpg";
            var url = baseUrl.replace('/uploads/files/users', '');
            return <img src={url} style={{ "width": "70px", "height": "70px", 'max-width': '70px', 'padding': '4px' }} />;
        }
    }

    return (
        <div className="main-content">
            <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="user-data m-b-30">
                                <h3 className="title-3 m-b-30">
                                    <i className="fa fa-user"></i>user data</h3>
                                {/*<div className="filters m-b-45">*/}
                                {/*<div className="rs-select2--dark rs-select2--md rs-select2--border">*/}
                                {/*<select className="js-select2" name="property">*/}
                                {/*<option value="1" selected="selected">Manegemenet</option>*/}
                                {/*<option value="2">System Engineer</option>*/}
                                {/*<option value="3">Customer</option>*/}
                                {/*</select>*/}
                                {/*<div className="dropDownSelect2"></div>*/}
                                {/*</div>*/}
                                {/*<div className="rs-select2--dark rs-select2--md rs-select2--border">*/}
                                {/*<select className="js-select2 au-select-dark" name="time">*/}
                                {/*<option value="4" selected="selected">Administrator</option>*/}
                                {/*<option value="1">Staff</option>*/}
                                {/*<option value="2">Customer</option>*/}
                                {/*</select>*/}
                                {/*<div className="dropDownSelect2"></div>*/}
                                {/*</div>*/}
                                {/*</div>*/}

                                <div className="table-responsive table-data">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>Hình ảnh</td>
                                                <td>Tên tài khoản</td>
                                                <td>Họ tên</td>
                                                <td>Chức vụ</td>
                                                <td>level</td>
                                                <td>created user</td>
                                                <td>status</td>
                                                <td>action</td>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {lstUsers.map(function (value, key) {
                                                return <tr key={value.id}>
                                                    <td>
                                                        {imgUser(baseUrl, value.img)}
                                                    </td>
                                                    <td>{value.user_name}</td>
                                                    <td>
                                                        {value.full_name}
                                                    </td>
                                                    <td>{value.position}</td>
                                                    <td>
                                                        {getPosition(value['level'])}
                                                    </td>
                                                    <td>
                                                        {value.created_user}
                                                    </td>
                                                    <td>
                                                        {getStatus(value.status)}
                                                    </td>
                                                    <td>
                                                        {getAction(value.status, value.id)}
                                                        {getRestock(value.status, value.id)}
                                                    </td>
                                                </tr>;
                                            })}
                                            {/*<tr>*/}
                                            {/*<td>*/}
                                            {/*<img src="/images/icon/avatar-02.jpg" style={{"width": "50px", "height": "50px"}} />*/}
                                            {/*</td>*/}
                                            {/*<td>Linh123</td>*/}
                                            {/*<td>*/}
                                            {/*Linh Nguyen*/}
                                            {/*</td>*/}
                                            {/*<td>Leader</td>*/}
                                            {/*<td>*/}
                                            {/*<span className="role member">member</span>*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*Admin*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*<span className="status--process">Ready</span>*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*<a href="edit-user.html">*/}
                                            {/*<i className="fa fa-edit fa-lg" style={{color: bgColors.Edit}}></i>*/}
                                            {/*</a>&nbsp;*/}
                                            {/*<a href="#" onClick={e =>*/}
                                            {/*window.confirm("You want to delete this user?") &&*/}
                                            {/*this.deleteItem(e)*/}
                                            {/*}>*/}
                                            {/*<i className="fa fa-trash fa-lg" style={{color: bgColors.Red}}></i>*/}
                                            {/*</a>*/}
                                            {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                            {/*<td>*/}
                                            {/*<img src="/images/icon/avatar-03.jpg" style={{"width": "50px", "height": "50px"}} />*/}
                                            {/*</td>*/}
                                            {/*<td>Nam</td>*/}
                                            {/*<td>*/}
                                            {/*Nam Duong*/}
                                            {/*</td>*/}
                                            {/*<td>Customer</td>*/}
                                            {/*<td>*/}
                                            {/*<span className="role user">customer</span>*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*Admin*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*<span className="status--denied">Denied</span>*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*<a href={'#'} onClick={e =>*/}
                                            {/*window.confirm("You want to restock this user?") &&*/}
                                            {/*this.deleteItem(e)*/}
                                            {/*} style={{color: bgColors.Confirm}}>*/}
                                            {/*<i className="fa fa-undo fa-lg"></i>*/}
                                            {/*</a>*/}
                                            {/*</td>*/}
                                            {/*</tr>*/}
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