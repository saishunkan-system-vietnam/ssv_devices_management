import React, { useState, useEffect } from 'react';
import BorrowView from '../../../api/borrowView';
import { useAlert } from "react-alert";
import {toShortDate} from '../../../common/date';
import {Link} from 'react-router-dom';
// import { confirmAlert } from 'react-confirm-alert'; 
// import DeleteCategory from '../../../api/deletecategory';

function View(props) {
    const [borrow, setBorrow] = useState([]);
    const [statusDevice, setStatusDevice] = useState(false);
    const [statusUser, setStatusUser] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        if (borrow.length === 0) {
            BorrowView.BorrowView(props.match.params.id).then(responseJson => {
                setBorrow(responseJson['payload']['borrowDevices']);
            });
        }
    });

    const status = () => {
        let staust_name = '';
        if (Number(borrow.BorrowDevicesDetail.status) === 0) {
            staust_name = <span className="label label-primary">Borrow request</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 1) {
            staust_name = <span className="label label-success">Borrowing</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 2) {
            staust_name = <span className="label label-default">Borrow faild</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 3) {
            staust_name = <span className="label label-warning">Return request</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 4) {
            staust_name = <span className="label label-danger">Returned</span>;
        }
        return (
            <React.Fragment>
                {staust_name}
            </React.Fragment>
        )
    }

    //console.log('data borrow', borrow);
    //console.log( borrow.BorrowDevicesDetail);
    // function handleDelete() {
    //     confirmAlert({
    //         customUI: ({ onClose }) => {
    //             var formdata = new FormData();
    //             formdata.append('id', category.id);
    //             return (
    //                 <div className='custom-ui'>
    //                     <h1>Are you sure?</h1>
    //                     <p>You want to delete this category?</p>
    //                     <button onClick={() => DeleteCategory.deleteCategory(formdata).then(responseJson => {
    //                         if (responseJson['0'] === 200) {
    //                             alert.success("The category has been delete!");
    //                             onClose();
    //                             props.history.push('/categories');
    //                         } else {
    //                             alert.error("The category could not be delete. Please, try again.");
    //                             onClose();
    //                         }
    //                     })}>Yes</button>
    //                     <button onClick={onClose}>No</button>
    //                 </div>
    //             )
    //         }
    //     })
    // }

    const handleClickName = () => {
        setStatusUser(!statusUser);
    }

    const handleClickDevice = () => {
        setStatusDevice(!statusDevice)
    }

    return (
        <div className="row p-20">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <legend className="pl-30">View borrow</legend>
                <hr />
            </div>

            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-10" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        ID:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.id}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Handover ID:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.handover_id}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Approved ID:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.approved_id}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Borrower:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickName}>
                        {borrow.Users ? borrow.Users.full_name : ""}
                    </div>
                </div>

                <div className={statusUser ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Borrower ID:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.id : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            User name:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.user_name : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Position:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.position : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Team:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.team : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Email:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.email : ""}
                        </div>
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Borrow device:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickDevice}>
                        {borrow.Devices ? borrow.Devices.name : ""}
                    </div>
                </div>
                <div className={statusDevice ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Borrow device ID:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Devices ? borrow.Devices.id : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Serial number:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Devices ? borrow.Devices.serial_number : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Specifications:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Devices ? borrow.Devices.specifications : ""}
                        </div>
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Borrow reason:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.borrow_reason : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Return reason:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.return_reason : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Status:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? status() : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Borrow date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.borrow_date) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Approved date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.approved_date) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Delivery date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.delivery_date) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Return date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.return_date) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        User created:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.created_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        User update:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.update_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Time created:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.created_time : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Time update:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.update_time : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Admin note:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.note_admin : ""}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">

                        <Link to={`/borrow/edit/${borrow.id}`} className="btn btn-primary">Edit</Link>
                        <Link to={`/borrow/edit/`} className="btn btn-danger ml-10">Delete</Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
