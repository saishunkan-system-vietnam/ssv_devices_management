import React, { useState, useEffect, useRef } from 'react';
import MaintenanceItem from './Item';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert';
import MaintenanceList from '../../../api/maintenanceList';
import MaintenanceDelete from '../../../api/maintenanceDelete';
import MaintenanceConfirmNotification from '../../../api/maintenanceConfirmNotification';
import MaintenanceNoConfirmNotification from '../../../api/maintenanceNoConfirmNotification';
import MaintenanceFilter from '../../../api/maintenanceFilter';
import NoData from '../../../common/NoData';

function ListBorrow() {

    const [maintenances, setMaintenances] = useState([]);
    const [status, setStatus] = useState(null);
    const [status_name, setStatus_name] = useState(null);
    const [lstCountStatus, setLstCountStatus] = useState(null);

    var alert = useAlert();

    useEffect(() => {
        if (maintenances.length === 0) {
            getListMaintenances();
        }
        if (!lstCountStatus) {
            getFliter()
        }
    }, [])

    function getFliter(name = '', status = '') {
        var frm = new FormData();
        frm.append(name, status);
        MaintenanceFilter.MaintenanceFilter(frm).then(res => {
            if (res) {
                setLstCountStatus(res.payload.lstCount);
                setMaintenances(res.payload.lstMaintenances);
            }
        })
    }

    function getListMaintenances() {
        MaintenanceList.MaintenanceList().then(res => {
            if (res) {
                setMaintenances(res.payload.lstMaintenances);
            }
        });
    }



    var maintenanceItem = maintenances.map((maintenance, index) => {
        return <MaintenanceItem
            key={index}
            stt={index}
            maintenance={maintenance}
            onDelete={onDeleteItem}
            onConfirm={onConfirmItem}
            onNoConfirm={onNoConfirmItem}
        />
    })

    function onDeleteItem(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa thông tin bảo trì?</h1>
                        <button onClick={() => MaintenanceDelete.MaintenanceDelete(frm).then(res => {
                            if (res['0'] === 200) {
                                alert.success(res.payload.message);
                                onClose();
                                getListMaintenances();
                                getFliter(status_name, status);
                            } else {
                                alert.error(res.payload.message);
                                onClose();
                            }
                        })}>Xóa</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    function onConfirmItem(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xác nhận thông tin báo hỏng?</h1>
                        <button onClick={() => MaintenanceConfirmNotification.MaintenanceConfirmNotification(frm).then(res => {
                            if (res['0'] === 200) {
                                alert.success(res.payload.message);
                                onClose();
                                getListMaintenances();
                                getFliter(status_name, status);
                            } else {
                                alert.error(res.payload.message);
                                onClose();
                            }
                        })}>Xác nhận</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    function onNoConfirmItem(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa thông tin bảo trì?</h1>
                        <button onClick={() => MaintenanceNoConfirmNotification.MaintenanceNoConfirmNotification(frm).then(res => {
                            if (res['0'] === 200) {
                                alert.success(res.payload.message);
                                onClose();
                                getListMaintenances();
                                getFliter(status_name, status);
                            } else {
                                alert.error(res.payload.message);
                                onClose();
                            }
                        })}>Xóa</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    function handleChange(_status, name) {
        if (status !== _status) {
            setStatus(_status);
            getFliter(name, _status);
            setStatus_name(name);
        } else {
            setStatus('');
            setStatus_name('');
            getFliter();
        }

    }

    return (
        <div>
            <div className="row filter">

                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <span onClick={() => handleChange(1, "notification_broken")} className="label label-primary ml-10">{status === 1 ? <i className="fas fa-check"></i> : ""}Thông báo hỏng</span><span className="quantity">{lstCountStatus ? lstCountStatus.notification_broken : ''}  </span>
                    <span onClick={() => handleChange(2, "waiting_for_repair")} className="label label-success ml-10">{status === 2 ? <i className="fas fa-check"></i> : ""}Đang đợi bảo trì</span><span className="quantity">{lstCountStatus ? lstCountStatus.waiting_for_repair : ''}  </span>
                    <span onClick={() => handleChange(3, "repairing")} className="label label-default ml-10">{status === 3 ? <i className="fas fa-check"></i> : ""}Đang bảo trì</span><span className="quantity">{lstCountStatus ? lstCountStatus.repairing : ''}  </span>
                    <span onClick={() => handleChange(4, "repaired")} className="label label-warning ml-10">{status === 4 ? <i className="fas fa-check"></i> : ""}Bảo trì thành công</span><span className="quantity">{lstCountStatus ? lstCountStatus.repaired : ''}  </span>
                    <span onClick={() => handleChange(5, "repair_fail")} className="label label-danger ml-10">{status === 5 ? <i className="fas fa-check"></i> : ""}Bảo trì thất bại</span><span className="quantity">{lstCountStatus ? lstCountStatus.repair_fail : ''}  </span>
                    <span onClick={() => handleChange(6, "no_confirm_notification")} className="label label-info ml-10">{status === 6 ? <i className="fas fa-check"></i> : ""}Thông báo hỏng bị hủy</span><span className="quantity">{lstCountStatus ? lstCountStatus.no_confirm_notification : ''}  </span>
                </div>

                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <Link to="/maintenance/add" className="btn btn-primary mr-10 mt-10"><i className="fa fa-plus"></i> Thêm mới</Link>
                </div>

            </div>
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th className="text-center">Mã bảo trì</th>
                                <th>Thiết bị</th>
                                <th>Trạng thái</th>
                                <th>Ngày hỏng</th>
                                <th>Người báo hỏng</th>
                                <th>Tổng chi phí bảo trì (vnđ)</th>
                                <th>Công cụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenanceItem}
                        </tbody>
                    </table>
                    {
                        maintenances.length === 0 &&
                        <NoData />
                    }
                </div>

            </div>
        </div>
    );
}

export default ListBorrow;
