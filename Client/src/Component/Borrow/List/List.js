import React, { useState, useEffect, useRef } from 'react';
import BorrowItem from './Item';
import List_Borrow from '../../../api/borrowList';
import { Link } from 'react-router-dom';
import BorrowDelete from '../../../api/borrowDelete';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert';
import BorrowApprove from '../../../api/borrowApprove';
import BorrowNoApprove from '../../../api/borrowNoApprove';
import BorrowReturn from '../../../api/borrowReturn';
import BorrowReturnConfirm from '../../../api/borrowReturnConfirm';
import BorrowFilter from '../../../api/borrowFilter';

function ListBorrow() {

    const [lstBorrow, setLstBorrow] = useState([]);
    const note_admin = useRef('');
    const return_reason = useRef('');
    const [status, setStatus] = useState('');
    const [status_name, setStatus_name] = useState('');
    const [filter, setFilter] = useState(null);

    var alert = useAlert();
    function handleGetLstBorrow() {
        List_Borrow.LstBorrow().then(responseJon => {
            if (responseJon) {
                setLstBorrow(responseJon['payload']['lstBorrowDevices']);
            }
        })
    }

    useEffect(() => {
        if (lstBorrow.length === 0) {
            console.log('a');
            handleGetLstBorrow();
        }

        if (!filter) {
            handleGetFilter(status_name);
        }

    },[])

    function handleGetFilter(_status_name) {
        var frm = new FormData();
        frm.append('status', _status_name);
        BorrowFilter.BorrowFilter(frm).then(res => {
            // console.log(_status_name);
            // console.log(res.payload);
            if (res && res.payload) {
                setFilter(res.payload);
                setLstBorrow(res.payload.lstBorrowDevices);
            }
        })
    }

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
                            if (responseJson['0'] === 200) {
                                alert.success("The infomation borrow has been delete!");
                                onClose();
                                handleGetLstBorrow();
                                handleGetFilter('');
                            } else {
                                alert.error("The infomation borrow could not be delete. Please, try again.");
                                onClose();
                            }
                        })}>Yes</button>
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

                        <button onClick={() => {
                            var frm = new FormData();
                            frm.append('id', id);
                            BorrowApprove.BorrowApprove(frm).then(responseJson => {
                                if (responseJson['0'] === 200) {
                                    alert.success(responseJson.payload.message);
                                    handleGetLstBorrow();
                                    handleGetFilter('');
                                } else {
                                    alert.error(responseJson.payload.message);
                                }
                            })
                            onClose()
                        }}>Yes, approve borrow!</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }

    function onNoApproveItem(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want not to approve this borrow?</p>

                        <div className="form-group">
                            <label className="col-sm-2">Reason:</label>
                            <div className="col-sm-12">
                                <textarea ref={note_admin} className="form-control" rows="2" required="required"></textarea>
                            </div>
                        </div>

                        <button onClick={() => {
                            var frm = new FormData();
                            frm.append('id', id);
                            frm.append('note_admin', note_admin.current.value);
                            BorrowNoApprove.BorrowNoApprove(frm).then(responseJson => {
                                if (responseJson['0'] === 200) {
                                    alert.success(responseJson.payload.message);
                                    handleGetLstBorrow();
                                    handleGetFilter('');
                                } else {
                                    alert.error(responseJson.payload.message);
                                }
                            })
                            onClose()
                        }}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }

    function returnDevice(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to return device this borrow?</p>

                        <div className="form-group">
                            <label className="col-sm-2">Return reason:</label>
                            <div className="col-sm-12">
                                <textarea ref={return_reason} className="form-control" rows="2" required="required"></textarea>
                            </div>
                        </div>

                        <button onClick={() => {
                            var frm = new FormData();
                            frm.append('id', id);
                            frm.append('note_admin', return_reason.current.value);
                            BorrowReturn.BorrowReturn(frm).then(responseJson => {
                                if (responseJson['0'] === 200) {
                                    alert.success(responseJson.payload.message);
                                    handleGetLstBorrow();
                                    handleGetFilter('');
                                } else {
                                    alert.error(responseJson.payload.message);
                                }
                            })
                            onClose()
                        }}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }

    function confirmReturnDevice(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to return device this borrow?</p>

                        <button onClick={() => {
                            var frm = new FormData();
                            frm.append('id', id);
                            BorrowReturnConfirm.BorrowReturnConfirm(frm).then(responseJson => {
                                if (responseJson['0'] === 200) {
                                    alert.success(responseJson.payload.message);
                                    handleGetLstBorrow();
                                    handleGetFilter('');
                                } else {
                                    alert.error(responseJson.payload.message);
                                }
                            })
                            onClose()
                        }}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
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
        let status_code = borrow.BorrowDevicesDetail.status;

        return <BorrowItem
            key={index}
            id={borrow.id}
            borrower={borrow.Users.full_name}
            device={borrow.Devices.name}
            device_id={borrow.Devices.id}
            status={staust_name}
            status_code={status_code}
            borrow_date={borrow.BorrowDevicesDetail.borrow_date}
            approved_date={borrow.BorrowDevicesDetail.approved_date}
            return_date_expected={borrow.BorrowDevicesDetail.return_date_expected}
            return_date={borrow.BorrowDevicesDetail.return_date}
            created_user={borrow.BorrowDevicesDetail.created_user}
            update_user={borrow.BorrowDevicesDetail.update_user}
            created_time={borrow.BorrowDevicesDetail.created_time}
            update_time={borrow.BorrowDevicesDetail.update_time}
            onDelete={onDeleteItem}
            onApprove={onApproveItem}
            onNoApprove={onNoApproveItem}
            returnDevice={returnDevice}
            confirmReturnDevice={confirmReturnDevice}
        />
    });

    function handleChange(_status, _status_name) {
        _status = (status === _status ? '' : _status);
        _status_name = (status_name === _status_name ? '' : _status_name);
        setStatus_name(_status_name);
        setStatus(_status);
        handleGetFilter(_status_name);
    }
    return (
        <div>
            <div className="row mt-10 filter">
                <Link to="/borrow/add" className="btn btn-primary add ml-10"><i className="fa fa-plus"></i></Link>
                <p><span onClick={() => handleChange(0, "borrow_request")} className="label label-primary ml-10">{status === 0 ? <i className="fas fa-check"></i> : ""}Borrow request</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.borrow_request : ''}</span></p>
                <p><span onClick={() => handleChange(1, "borrowing")} className="label label-success ml-10">{status === 1 ? <i className="fas fa-check"></i> : ""}Borrowing</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.borrowing : ''}</span></p>
                <p><span onClick={() => handleChange(2, "no_borrow")} className="label label-default ml-10">{status === 2 ? <i className="fas fa-check"></i> : ""}Borrow faild</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.no_borrow : ''}</span></p>
                <p><span onClick={() => handleChange(3, "return_request")} className="label label-warning ml-10">{status === 3 ? <i className="fas fa-check"></i> : ""}Return request</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.return_request : ''}</span></p>
                <p><span onClick={() => handleChange(4, "returned")} className="label label-danger ml-10">{status === 4 ? <i className="fas fa-check"></i> : ""}Returned</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.returned : ''}</span></p>
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
                                <th>Approved date</th>
                                <th>Return date</th>
                                <th>Return date</th>
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
