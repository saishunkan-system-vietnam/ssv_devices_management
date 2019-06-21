import React, { useState, useEffect } from 'react';
import BorrowView from '../../../api/Borrow/borrowView';
import { useAlert } from "react-alert";
import { toShortDate } from '../../../common/date';
import { confirmAlert } from 'react-confirm-alert';
import BorrowDelete from '../../../api/Borrow/borrowDelete';
function View(props) {
    const [borrow, setBorrow] = useState([]);
    const [statusDevice, setStatusDevice] = useState(false);
    const [statusUser, setStatusUser] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        if (borrow.length === 0) {
            BorrowView.BorrowView(props.id).then(responseJson => {
                setBorrow(responseJson['payload']['borrowDevices']);
            });
        }
    });

    const status = () => {
        let staust_name = '';
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
        return (
            <React.Fragment>
                {staust_name}
            </React.Fragment>
        )
    }

    function handleDelete() {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', borrow.id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa thông tin mượn đồ?</h1>
                        <button onClick={() => BorrowDelete.BorrowDelete(frm).then(responseJson => {
                            if (responseJson['0'] === 200) {
                                alert.success("The infomation borrow has been delete!");
                                onClose();
                                props.set_show(1);
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

    const handleClickName = () => {
        setStatusUser(!statusUser);
    }

    const handleClickDevice = () => {
        setStatusDevice(!statusDevice)
    }

    return (
        <div className="row p-20">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <legend className="pl-30">Thông tin chi tiết mượn đồ</legend>
                <hr />
            </div>

            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-10" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Mã mượn đồ:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.id}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người bàn giao:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.User_handover ? borrow.User_handover.user_name : ''}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người phê duyệt:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.User_approved ? borrow.User_approved.user_name : ''}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người mượn:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickName}>
                        {borrow.Users ? borrow.Users.full_name : ""}
                    </div>
                </div>

                <div className={statusUser ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Mã người mượn:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.id : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Tên tài khoản:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.user_name : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Chức vụ:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Users ? borrow.Users.position : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Nhóm:
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
                        Thiết bị mượn:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickDevice}>
                        {borrow.Devices ? borrow.Devices.name : ""}
                    </div>
                </div>
                <div className={statusDevice ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Mã thiết bị:
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
                            Thông số:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {borrow.Devices ? borrow.Devices.specifications : ""}
                        </div>
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Lý do mượn:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.borrow_reason : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Lý do trả:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.return_reason : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Trạng thái:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? status() : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày mượn:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.borrow_date) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày phê duyệt:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.approved_date, true, true) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày trả dự kiến:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.return_date_expected, true, true) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày trả:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.return_date, true, true) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người tạo:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.created_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người cập nhập:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.update_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian tạo:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.created_time) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian cập nhập:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? toShortDate(borrow.BorrowDevicesDetail.update_time) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ghi chú:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {borrow.BorrowDevicesDetail ? borrow.BorrowDevicesDetail.note_admin : ""}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {borrow.BorrowDevicesDetail && Number(borrow.BorrowDevicesDetail.status) === 0 ? <button onClick={()=>{props.set_show(3,borrow.id)}} className="btn btn-primary">Cập nhập</button> : ""}
                        {borrow.BorrowDevicesDetail && Number(borrow.BorrowDevicesDetail.status) !== 1 && Number(borrow.BorrowDevicesDetail.status) !== 3 ? <button onClick={handleDelete} className="btn btn-danger ml-10">Xóa</button> : ""}
                        <button onClick={() => { props.set_show(1) }} className="btn btn-warning ml-10">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
