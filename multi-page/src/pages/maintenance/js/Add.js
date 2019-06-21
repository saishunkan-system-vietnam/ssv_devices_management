import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import ListDevice from "../../../api/Devices/deviceList";
import MaintenanceAdd from '../../../api/Maintenance/maintenanceAdd';
import MaintenanceEdit from '../../../api/Maintenance/maintenanceEdit';
import MaintenanceView from '../../../api/Maintenance/maintenanceView';
import { toShortDate } from '../../../common/date';
import { formatMoney } from '../../../common/fomat';

function Add(props) {

    const [lstDevice, setLstDevice] = useState([]);
    const devices_id = useFormInput('');
    const status = useFormInput("1");
    const broken_date = useFormInput('');
    const maintenance_start_date = useFormInput('');
    const maintenances_end_date = useFormInput('');
    const note = useFormInput('');
    const maintenances_address = useFormInput('');
    const [total_payment, setTotal_payment] = useState(0);
    const [maintenance_id, setMaintenance_id] = useState(null);

    const alert = useAlert();

    const onSave = (e) => {
        e.preventDefault();
        var frm = new FormData();
        frm.append("devices_id", devices_id.value);
        frm.append("status", status.value);
        frm.append("broken_date", broken_date.value);
        frm.append("note", note.value);
        var start_date = '';
        var end_date = "";
        var address = "";
        var total_pay = "";
        if (status.value !== "0" && status.value !== "1") {
            start_date = maintenance_start_date.value;
            end_date = maintenances_end_date.value;
            address = maintenances_address.value;
            total_pay = total_payment.toString().replace(/,/g, '');
        }
        frm.append("maintenance_start_date", start_date);
        frm.append("maintenances_end_date", end_date);
        frm.append("maintenances_address", address);
        frm.append("total_payment", total_pay);
        if (maintenance_id) {
            frm.append("id", maintenance_id);
            MaintenanceEdit.MaintenanceEdit(frm).then(res => {
                if (res['0'] === 200) {
                    alert.success(res.payload.message);
                    props.history.push('/maintenance');
                } else {
                    var obj = res.payload.message;
                    messageFaild(obj);
                }
            })
        } else {
            MaintenanceAdd.MaintenancesAdd(frm).then(res => {
                if (res['0'] === 200) {
                    alert.success(res.payload.message);
                    props.history.push('/maintenance');
                } else {
                    var obj = res.payload.message;
                    messageFaild(obj);
                }
            });
        }

    }

    function messageFaild(obj) {
        if (typeof obj === 'object') {
            for (const key in obj) {
                for (const k in obj[key]) {
                    alert.error(`${obj[key][k]}`);
                }
            }
        } else {
            alert.error(obj);
        }
    }

    useEffect(() => {
        if (lstDevice.length === 0) {
            getListDevices();
        }
        if (!maintenance_id && props.id) {
            getMaintenance();
        }
    });

    function getMaintenance() {
        MaintenanceView.MaintenanceView(props.id).then(res => {
            let maintenance = res.payload.maintenance;
            setMaintenance_id(maintenance.id);
            devices_id.onChange({ target: { value: maintenance.devices_id } });
            status.onChange({ target: { value: `${maintenance.status}` } });
            broken_date.onChange({ target: { value: toShortDate(maintenance.broken_date) } });
            if (maintenance.maintenance_start_date) {
                maintenance_start_date.onChange({ target: { value: toShortDate(maintenance.maintenance_start_date) } });
            }
            if (maintenance.maintenances_end_date) {
                maintenances_end_date.onChange({ target: { value: toShortDate(maintenance.maintenances_end_date) } });
            }
            note.onChange({ target: { value: maintenance.note } });
            maintenances_address.onChange({ target: { value: maintenance.maintenances_address } });
            if (maintenance.total_payment) {
                setTotal_payment(maintenance.total_payment);
            }
        })
    }

    function getListDevices() {
        ListDevice.LstDevice().then(res => {
            setLstDevice(res.payload.lstDevices);
            devices_id.onChange({ target: { value: res.payload.lstDevices["0"].id } });
        })
    }

    var optionDevice = lstDevice.map((device, index) => {
        let result = '';
        if (device.status === 0) {
            result = <option key={index} value={device.id}>{device.name}</option>;
        }
        return result;
    })

    function useFormInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        function hanldeChange(e) {
            setValue(e.target.value);
        }
        return {
            value,
            onChange: hanldeChange
        };
    }

    function handleOnchange(e) {
        let money = e.target.value;
        money = money.toString().replace(/,/g, '');
        money = Number(money);
        setTotal_payment(formatMoney(money));
    }

    return (
        <div className="row p-20">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                    <legend className="pl-30">{maintenance_id ? 'Cập nhập thông tin bảo trì' : 'Thêm mới bảo trì'}</legend><hr />

                    <div className="form-group">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label>Thiết bị:</label>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <select className="form-control" {...devices_id} >
                                {optionDevice}
                            </select>
                        </div>
                    </div>


                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="radio">
                            <label className="ml-10"><input type="radio" name="status" {...status} value="1" checked={status.value === "1"} />&nbsp;Đợi bảo trì</label>
                            <br /><label className="ml-10"><input type="radio" name="status"  {...status} value="2" checked={status.value === "2"} />&nbsp;Đang bảo trì</label>
                            <br /><label className="ml-10"><input type="radio" name="status"  {...status} value="3" checked={status.value === "3"} />&nbsp;Bảo trì thành công</label>
                            <br /><label className="ml-10"><input type="radio" name="status"  {...status} value="4" checked={status.value === "4"} />&nbsp;Bảo trì thất bại</label>
                            <br /><label className="ml-10"><input type="radio" name="status"  {...status} value="5" checked={status.value === "5"} />&nbsp;Thông báo hủy bị hỏng</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2">Ghi chú hỏng:</label>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <textarea className="form-control" rows="1" {...note}></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Ngày bị hỏng:</label>
                        <div className="col-sm-4">
                            <input type="date" className="form-control" required="required" title="Borrow date" {...broken_date} />
                        </div>
                    </div>
                    {status.value !== "0" && status.value !== "1" &&
                        <React.Fragment>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Ngày bắt đầu bảo trì</label>
                                <div className="col-sm-4">
                                    <input type="date" className="form-control" required="required" title="Return date expected" {...maintenance_start_date} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-2 control-label">Ngày kết thúc bảo trì:</label>
                                <div className="col-sm-4">
                                    <input type="date" className="form-control" required="required" title="Return date expected" {...maintenances_end_date} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2">Địa chỉ bảo trì:</label>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <textarea className="form-control" rows="1" {...maintenances_address}></textarea>
                                </div>
                            </div>


                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2">Tổng số tiền thanh toán (vnđ):</label>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <input type="text" className="form-control" title="Total pay" onChange={handleOnchange} value={total_payment} />
                                </div>
                            </div>
                        </React.Fragment>
                    }

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                            <button type="submit" className="btn btn-primary" onClick={onSave}><i className="fa fa-save"></i> Lưu</button>
                            <button onClick={()=>{props.set_show(1)}} className="btn btn-danger ml-10"><i className="fa fa-times"></i> Hủy</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Add;