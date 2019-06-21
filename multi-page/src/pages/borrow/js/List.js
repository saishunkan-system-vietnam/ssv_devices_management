import React, { useState, useEffect, useRef } from 'react';
import BorrowItem from './Item';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert';
import BorrowDelete from '../../../api/Borrow/borrowDelete';
import List_Borrow from '../../../api/Borrow/borrowList';
import BorrowApprove from '../../../api/Borrow/borrowApprove';
import BorrowNoApprove from '../../../api/Borrow/borrowNoApprove';
import BorrowReturn from '../../../api/Borrow/borrowReturn';
import BorrowReturnConfirm from '../../../api/Borrow/borrowReturnConfirm';
import BorrowFilter from '../../../api/Borrow/borrowFilter';
import NoData from '../../../common/NoData';

function ListBorrow(props) {

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
            handleGetLstBorrow();
        }

        if (!filter) {
            handleGetFilter(status_name);
        }

    }, [])

    function handleGetFilter(_status_name) {
        var frm = new FormData();
        frm.append('status', _status_name);
        BorrowFilter.BorrowFilter(frm).then(res => {
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
                        <h1>Bạn đang xóa thông tin mượn đồ?</h1>
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
                        })}>Xóa</button>
                        <button onClick={onClose}>Hủy</button>
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
                        <h1>Bạn đang phê duyệt thông tin mượn đồ?</h1>
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
                        }}>Phê duyệt</button>
                        <button onClick={onClose}>Hủy</button>
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
                        <h1>Bạn đang không phê duyệt thông tin mượn đồ?</h1>
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
                        }}>Đồng ý</button>
                        <button onClick={onClose}>Hủy</button>
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
                        <h1>Bạn đang yêu cầu trả thiết bị?</h1>
                        <div className="form-group">
                            <label className="col-sm-2">Lý do trả:</label>
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
                        }}>Xác nhận</button>
                        <button onClick={onClose}>Hủy</button>
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
                        <h1>Bạn đang xác nhận trả thiết bị?</h1>
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
                        }}>Xác nhận</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    var listItem = lstBorrow.map((borrow, index) => {
        let staust_name = '';
        let result = "";
        if (Number(borrow.BorrowDevicesDetail.status) === 0) {
            staust_name = <span className="label label-primary">Yêu cầu mượn</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 1) {
            staust_name = <span className="label label-success">Thiết bị đang mượn</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 2) {
            staust_name = <span className="label label-default">Mượn thất bại</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 3) {
            staust_name = <span className="label label-warning">Yêu cầu trả</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 4) {
            staust_name = <span className="label label-danger">Đã trả</span>;
        }
        let status_code = borrow.BorrowDevicesDetail.status;
        return result = <BorrowItem
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
            set_show={set_show}
        />;
    });

    function set_show(show, borrow_id) {
        props.set_show(show, borrow_id);
    }

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

                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <span onClick={() => handleChange(0, "borrow_request")} className="label label-primary ml-10">{status === 0 ? <i className="fas fa-check"></i> : ""}Yêu cầu mượn</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.borrow_request : ''}</span>
                    <span onClick={() => handleChange(1, "borrowing")} className="label label-success ml-10">{status === 1 ? <i className="fas fa-check"></i> : ""}Thiết bị đang mượn</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.borrowing : ''}</span>
                    <span onClick={() => handleChange(2, "no_borrow")} className="label label-default ml-10">{status === 2 ? <i className="fas fa-check"></i> : ""}Mượn thất bại</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.no_borrow : ''}</span>
                    <span onClick={() => handleChange(3, "return_request")} className="label label-warning ml-10">{status === 3 ? <i className="fas fa-check"></i> : ""}Yêu cầu trả</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.return_request : ''}</span>
                    <span onClick={() => handleChange(4, "returned")} className="label label-danger ml-10">{status === 4 ? <i className="fas fa-check"></i> : ""}Đã trả</span><span className="quantity">{filter && filter.lstCount ? filter.lstCount.returned : ''}</span>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <button onClick={() => { props.set_show(2) }} className="btn btn-primary mt-10 mr-10"><i className="fa fa-plus"></i> Thêm mới</button>
                </div>

            </div>
            <div className="row mt-10">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Mã</th>
                                <th>Người mượn</th>
                                <th>Thiết bị</th>
                                <th>Trạng thái</th>
                                <th>Ngày mượn</th>
                                <th>Ngày duyệt</th>
                                <th>Dự kiến ngày trả</th>
                                <th>Ngày trả</th>
                                <th>Công cụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItem}
                        </tbody>
                    </table>
                    {
                        lstBorrow.length === 0 &&
                        <NoData />
                    }
                </div>

            </div>
        </div>
    );
}

export default ListBorrow;
