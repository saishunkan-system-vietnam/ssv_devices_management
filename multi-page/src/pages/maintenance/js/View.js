import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import { toShortDate } from '../../../common/date';
import { confirmAlert } from 'react-confirm-alert';
import MaintenanceView from '../../../api/Maintenance/maintenanceView';
import { status } from './status';
import MaintenanceDelete from '../../../api/Maintenance/maintenanceDelete';
import MaintenanceEdit from '../../../api/Maintenance/maintenanceEdit';
import { formatMoney } from '../../../common/fomat';

function View(props) {
    const alert = useAlert();
    const [maintenance, setMaintenance] = useState(null);
    const [statusUsername, setStatusUsername] = useState(false);
    const [statusDevice, setStatusDevice] = useState(false);
    useEffect(() => {
        if (!maintenance && props.id) {
            getMaintenance();
        }
    });

    function getMaintenance() {
        MaintenanceView.MaintenanceView(props.id).then(res => {
            setMaintenance(res.payload.maintenance);
        })
    }

    function handleDelete() {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', maintenance.id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa thông tin bảo trì?</h1>
                        <button onClick={() => MaintenanceDelete.MaintenanceDelete(frm).then(res => {
                            if (res['0'] === 200) {
                                alert.success("The maintenance has been delete!");
                                onClose();
                                props.set_show(1);
                            } else {
                                alert.error("The maintenance could not be delete. Please, try again.");
                                onClose();
                            }
                        })}>Xóa</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    function changeStatus(_status) {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', maintenance.id);
                frm.append('status', _status);
                frm.append('broken_date', toShortDate(maintenance.broken_date));
                frm.append('note', maintenance.note);
                frm.append('devices_id', maintenance.devices_id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang thay đổi thông tin trạng thái bảo trì?</h1>
                        <button onClick={() => {
                            MaintenanceEdit.MaintenanceEdit(frm).then(res => {
                                if (res['0'] === 200) {
                                    alert.success(res.payload.message);
                                    onClose();
                                    props.history.push('/maintenance');
                                } else {
                                    alert.error(res.payload.message);
                                    onClose();
                                }
                            })
                        }
                        } >Đồng ý</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    const handleClickUsername = () => {
        setStatusUsername(!statusUsername);
    }

    const handleClickDevice = () => {
        setStatusDevice(!statusDevice);
    }

    return (
        <div className="row p-20">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <legend className="pl-30">Thông tin chi tiết bảo trì</legend>
                <hr />
            </div>

            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-10" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Mã bảo trì:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.id : ""}
                    </div>
                </div>


                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thiết bị:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickDevice}>
                        {maintenance && maintenance.Devices ? maintenance.Devices.name : ""}
                    </div>
                </div>
                <div className={statusDevice ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Mã thiết bị
                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Devices ? maintenance.Devices.id : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Serial number:
                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Devices ? maintenance.Devices.serial_number : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Thông số:
                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Devices ? maintenance.Devices.specifications : ""}
                        </div>
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Trạng thái:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? status(maintenance.status) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày bị hỏng:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? status(maintenance.borrow_date) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người báo hỏng:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickUsername}>
                        {maintenance && maintenance.Users ? maintenance.Users.user_name : ""}
                    </div>
                </div>

                <div className={statusUsername ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Mã người dùng:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.id : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Tên:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.full_name : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Tài khoản:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.user_name : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Chức vụ:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.position : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Nhóm:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.team : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Email:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.email : ""}
                        </div>
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ghi chú hỏng:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.note : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày bắt đầu bảo trì:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.maintenance_start_date : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày kết thúc bảo trì:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.maintenances_end_date : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Địa chỉ bảo trì:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.maintenances_address : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Tổng chi phí phải trả:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance && maintenance.total_payment ? formatMoney(maintenance.total_payment) + " vnđ" : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người tạo:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.create_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người cập nhập:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.update_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian tạo:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? toShortDate(maintenance.create_time) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian cập nhập:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? toShortDate(maintenance.update_time) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? <button onClick={() => { props.set_show(3, maintenance.id) }} className="btn btn-primary">Sửa</button> : ""}
                        {maintenance ? <button onClick={handleDelete} className="btn btn-danger ml-10">Xóa</button> : ""}
                        <button onClick={() => { props.set_show(1) }} className="btn btn-warning ml-10">Hủy</button>
                        {maintenance && maintenance.status === 1 ? <button type="button" onClick={() => changeStatus(2)} className="btn btn-success ml-10">Đang bảo trì</button> : ""}
                        {maintenance && maintenance.status === 2 ? <button type="button" onClick={() => changeStatus(3)} className="btn btn-warning ml-10">Bảo trì thành công</button> : ""}
                        {maintenance && maintenance.status === 2 ? <button type="button" onClick={() => changeStatus(4)} className="btn btn-danger ml-10">Bảo trì thất bại</button> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
