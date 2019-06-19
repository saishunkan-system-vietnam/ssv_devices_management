import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationBroken from '../../../api/notificationBroken';
import DevicesView from '../../../api/deviceView';
import { useAlert } from "react-alert";

function Add(props) {

    const [device, setDevice] = useState();
    const broken_date = useFormInput('');
    const note = useFormInput('');
    var alert = useAlert();
    useEffect(() => {
        if (props.match.params.id) {
            if (!device) {
                DevicesView.DeviceView(props.match.params.id).then(res => {
                    setDevice(res.payload.device ? res.payload.device : "");
                });
            }
        }
    })

    function useFormInput(initValue) {
        const [value, setValue] = useState(initValue);
        function handleChange(e) {
            setValue(e.target.value);
        }
        return {
            value,
            onChange: handleChange
        }
    }

    function onSave(e) {
        e.preventDefault();
        if (device) {
            var frm = new FormData();
            frm.append("devices_id", device.id);
            frm.append("broken_date", broken_date.value);
            frm.append("note", note.value);
            NotificationBroken.NotificationBorken(frm).then(res => {
                if (res['0'] === 200) {
                    alert.success(res['payload']['message']);
                    props.history.push('/borrow');
                } else {
                    let obj = res['payload']['message'];
                    if (typeof obj === 'string') {
                        alert.error(obj);
                    } else {
                        for (const key in obj) {
                            for (const k in obj[key]) {
                                alert.error(`${key}: ${obj[key][k]}`)
                            }
                        }
                    }
                }
            })
        }
    }

    return (
        <div className="row p-20">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                    <legend className="pl-30">Thông báo hỏng</legend><hr />

                    <div className="form-group">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label>Mã thiết bị:</label>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <input type="text" className="form-control" value={device && device.id ? device.id : ""} disabled />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label>Tên:</label>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <input type="text" className="form-control" value={device && device.name ? device.name : ""} disabled />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2">Ghi chú hỏng:</label>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <textarea className="form-control" rows="4" {...note}></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Ngày hỏng:</label>
                        <div className="col-sm-4">
                            <input type="date" className="form-control" required="required" title="Borrow date" {...broken_date} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                            <button type="submit" className="btn btn-primary" onClick={onSave}><i className="fa fa-save"></i> Lưu</button>
                            <Link to="/borrow" className="btn btn-danger ml-10"><i className="fa fa-times"></i> Hủy</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Add;