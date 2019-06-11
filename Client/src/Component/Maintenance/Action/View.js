import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import { toShortDate } from '../../../common/date';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import MaintenanceView from '../../../api/maintenanceView';
import { status } from '../status';
import MaintenanceDelete from '../../../api/maintenanceDelete';
import MaintenanceEdit from '../../../api/maintenanceEdit';
import { formatMoney } from '../../../common/fomat';

function View(props) {
    const alert = useAlert();
    const [maintenance, setMaintenance] = useState(null);
    const [statusUsername, setStatusUsername] = useState(false);
    const [statusDevice, setStatusDevice] = useState(false);

    useEffect(() => {
        if (!maintenance && props.match.params.id) {
            getMaintenance();
        }
    });

    function getMaintenance() {
        MaintenanceView.MaintenanceView(props.match.params.id).then(res => {
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
                        <h1>Are you sure?</h1>
                        <p>You want to delete this maintenance?</p>
                        <button onClick={() => MaintenanceDelete.MaintenanceDelete(frm).then(res => {
                            if (res['0'] === 200) {
                                alert.success("The maintenance has been delete!");
                                onClose();
                                props.history.push('/maintenance');
                            } else {
                                alert.error("The maintenance could not be delete. Please, try again.");
                                onClose();
                            }
                        })}>Yes</button>
                        <button onClick={onClose}>No</button>
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
                        <h1>Are you sure?</h1>
                        <p>You want to change status of this maintenance?</p>
                        <button onClick={() => MaintenanceEdit.MaintenanceEdit(frm).then(res => {
                            console.log(res);
                            if (res['0'] === 200) {
                                alert.success("The maintenance has been changed!");
                                onClose();
                                props.history.push('/maintenance');
                            } else {
                                alert.error("The maintenance could not be changed status. Please, try again.");
                                onClose();
                            }
                        })}>Yes</button>
                        <button onClick={onClose}>No</button>
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
                <legend className="pl-30">View maintenance</legend>
                <hr />
            </div>

            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-10" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        ID:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.id : ""}
                    </div>
                </div>


                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Device:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickDevice}>
                        {maintenance && maintenance.Devices ? maintenance.Devices.name : ""}
                    </div>
                </div>
                <div className={statusDevice ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Device ID
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
                            Specifications:
                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Devices ? maintenance.Devices.specifications : ""}
                        </div>
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Status:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? status(maintenance.status) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Broken date:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? status(maintenance.borrow_date) : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Notificationer broken:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 link" onClick={handleClickUsername}>
                        {maintenance && maintenance.Users ? maintenance.Users.user_name : ""}
                    </div>
                </div>

                <div className={statusUsername ? 'show' : "hide"}>
                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            User ID:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.id : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Name:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.full_name : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            User name:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.user_name : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Position:
                    </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            {maintenance && maintenance.Users ? maintenance.Users.position : ""}
                        </div>
                    </div>

                    <div className="row  mt-10">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            Team:
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
                        Broken reason:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.note : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Maintenance start date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.maintenance_start_date : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Maintenance end date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.maintenances_end_date : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Maintenances address:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.maintenances_address : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Total payment:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance && maintenance.total_payment ? formatMoney(maintenance.total_payment) +" vnđ" : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        User created:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.create_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        User update:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.update_user : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Time created:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.create_time : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Time update:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? maintenance.update_time : ""}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {maintenance ? <Link to={`/maintenance/edit/${maintenance.id}`} className="btn btn-primary">Edit</Link> : ""}
                        {maintenance ? <button onClick={handleDelete} className="btn btn-danger ml-10">Delete</button> : ""}
                        <Link to="/maintenance" className="btn btn-warning ml-10">Cancel</Link>
                        {maintenance && maintenance.status === 1 ? <button type="button" onClick={() => changeStatus(2)} className="btn btn-success ml-10">Repairing</button> : ""}
                        {maintenance && maintenance.status === 2 ? <button type="button" onClick={() => changeStatus(3)} className="btn btn-warning ml-10">Repaired</button> : ""}
                        {maintenance && maintenance.status === 2 ? <button type="button" onClick={() => changeStatus(4)} className="btn btn-danger ml-10">Repair fail</button> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
