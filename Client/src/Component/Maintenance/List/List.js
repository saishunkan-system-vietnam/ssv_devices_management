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
            setLstCountStatus(res.payload.lstCount);
            setMaintenances(res.payload.lstMaintenances);
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
                        <h1>Are you sure?</h1>
                        <p>You want to delete this maintenance?</p>
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
                        })}>Yes</button>
                        <button onClick={onClose}>No</button>
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
                        <h1>Are you sure?</h1>
                        <p>You want to confirm this notification broken?</p>
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
                        })}>Yes</button>
                        <button onClick={onClose}>No</button>
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
                        <h1>Are you sure?</h1>
                        <p>You want not to confirm this notification broken?</p>
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
                        })}>Yes</button>
                        <button onClick={onClose}>No</button>
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
            <div className="row mt-10 filter">
                <Link to="/maintenance/add" className="btn btn-primary add ml-10"><i className="fa fa-plus"></i></Link>
                <p><span onClick={() => handleChange(1, "notification_broken")} className="label label-primary ml-10">{status === 1 ? <i className="fas fa-check"></i> : ""}Notification broken</span><span className="quantity">    {lstCountStatus ? lstCountStatus.notification_broken : ''}  </span></p>
                <p><span onClick={() => handleChange(2, "waiting_for_repair")} className="label label-success ml-10">{status === 2 ? <i className="fas fa-check"></i> : ""}Waiting for repair</span><span className="quantity">           {lstCountStatus ? lstCountStatus.waiting_for_repair : ''}  </span></p>
                <p><span onClick={() => handleChange(3, "repairing")} className="label label-default ml-10">{status === 3 ? <i className="fas fa-check"></i> : ""}Repairing</span><span className="quantity">                 {lstCountStatus ? lstCountStatus.repairing : ''}  </span></p>
                <p><span onClick={() => handleChange(4, "repaired")} className="label label-warning ml-10">{status === 4 ? <i className="fas fa-check"></i> : ""}Repaired</span><span className="quantity">                {lstCountStatus ? lstCountStatus.repaired : ''}  </span></p>
                <p><span onClick={() => handleChange(5, "repair_fail")} className="label label-danger ml-10">{status === 5 ? <i className="fas fa-check"></i> : ""}Repair fail</span><span className="quantity">                    {lstCountStatus ? lstCountStatus.repair_fail : ''}  </span></p>
                <p><span onClick={() => handleChange(6, "no_confirm_notification")} className="label label-info ml-10">{status === 6 ? <i className="fas fa-check"></i> : ""}No confirm notification</span><span className="quantity">          {lstCountStatus ? lstCountStatus.no_confirm_notification : ''}  </span></p>
            </div>
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>Device</th>
                                <th>Status</th>
                                <th>Broken date</th>
                                <th>Notificationer broken</th>
                                <th>Total payment</th>
                                <th>created_user</th>
                                <th>update_user</th>
                                <th>created_time</th>
                                <th>update_time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maintenanceItem}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default ListBorrow;
