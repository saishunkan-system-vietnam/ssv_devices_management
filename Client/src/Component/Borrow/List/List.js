import React, { useState, useEffect, useRef } from 'react';
import BorrowItem from './Item';
import List_Borrow from '../../../api/borrowList';
import { Link } from 'react-router-dom';
import BorrowDelete from '../../../api/borrowDelete';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert';
import BorrowApprove from '../../../api/borrowApprove';

function ListBorrow() {

    const [lstBorrow, setLstBorrow] = useState([]);
    const note_admin = useRef('');
    var alert = useAlert();
    function handleGetLstBorrow() {
        List_Borrow.LstBorrow().then(responseJon => {
            setLstBorrow(responseJon['payload']['lstBorrowDevices']);
        })
    }

    useEffect(() => {
        if (lstBorrow.length === 0) {
            handleGetLstBorrow();
        }
    })

    function onDeleteItem(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', id);
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this borrow?</p>
                        <button onClick={() => BorrowDelete.BorrowDelete(frm).then(responseJson => {
                            console.log(responseJson);
                            if (responseJson['0'] === 200){
                                alert.success("The infomation borrow has been delete!");
                                onClose();
                                handleGetLstBorrow();
                            } else {
                                alert.error("The infomation borrow could not be delete. Please, try again.");
                                onClose();
                            }
                        })}>Yes, Delete borrow!</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }

    function onApproveItem(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to approve this borrow?</p>

                        <div className="form-group">
                            <label className="col-sm-2">Note:</label>
                            <div className="col-sm-12">
                                <textarea ref={note_admin} className="form-control" rows="2" required="required"></textarea>
                            </div>
                        </div>

                        <button onClick={() => {
                            approve(id)
                            onClose()
                        }}>Yes, approve borrow!</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }

    function approve(id) {
        var frm = new FormData();
        frm.append('id', id);
        frm.append('status', 1);
        frm.append('note_admin', note_admin.current.value);
        BorrowApprove.BorrowApprove(frm).then(responseJson => {
            if (responseJson['0'] === 200) {
                alert.success("The approve has been delete!");
                handleGetLstBorrow();
            } else {
                alert.error("The borrow could not be approved. Please, try again.");
            }
        })
    }

    var listItem = lstBorrow.map((borrow, index) => {
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
        return <BorrowItem
            key={index}
            id={borrow.id}
            borrower={borrow.Users.full_name}
            device={borrow.Devices.name}
            status={staust_name}
            borrow_date={borrow.BorrowDevicesDetail.borrow_date}
            approved_date={borrow.BorrowDevicesDetail.approved_date}
            delivery_date={borrow.BorrowDevicesDetail.delivery_date}
            return_date={borrow.BorrowDevicesDetail.return_date}
            created_user={borrow.BorrowDevicesDetail.created_user}
            update_user={borrow.BorrowDevicesDetail.update_user}
            created_time={borrow.BorrowDevicesDetail.created_time}
            update_time={borrow.BorrowDevicesDetail.update_time}
            onDelete={onDeleteItem}
            onApprove={onApproveItem}
        />
    });

    return (
        <div>
            <div className="row mt-10">
                <Link to="/borrow/add" className="btn btn-primary add ml-10"><i className="fa fa-plus"></i></Link>
            </div>
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Borrower</th>
                                <th>Device</th>
                                <th>Status</th>
                                <th>Borrow_date</th>
                                <th>approved_date</th>
                                <th>delivery_date</th>
                                <th>return_date</th>
                                <th>created_user</th>
                                <th>update_user</th>
                                <th>created_time</th>
                                <th>update_time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItem}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default ListBorrow;
