import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import BorrowAdd from "../../../api/borrowAdd";
import ListDevice from "../../../api/deviceList";
import BorrowView from '../../../api/borrowView';
import BorrowEdit from '../../../api/borrowEdit';
import { toShortDate } from '../../../common/date';
import { Link } from 'react-router-dom';

function Add(props) {
    const [borrow, setBorrow] = useState([]);
    const device_id = useFormInput('');
    const borrow_reason = useFormInput('');
    const borrow_date = useFormInput('');
    const return_date_expected = useFormInput('');
    const [lstDevice, setLstDevice] = useState([]);

    const alert = useAlert();

    const onSave = (e) => {
        e.preventDefault();
        var frm = new FormData();
        frm.append('device_id', device_id.value);
        frm.append('borrow_reason', borrow_reason.value);
        frm.append('borrow_date', borrow_date.value);
        frm.append('return_date_expected', return_date_expected.value);
        if (borrow.length!==0) {
            frm.append('id', borrow.id);
            if (borrow.BorrowDevicesDetail.status === '0') {
                BorrowEdit.BorrowEdit(frm).then(res => {
                    if (res['0'] === 200) {
                        alert.success(res['payload']['message']);
                        props.history.push('/borrow');
                    } else {
                        let obj = res['payload']['message'];
                        for (const key in obj) {
                            for (const k in obj[key]) {
                                alert.error(`${key}: ${obj[key][k]}`)
                            }
                        }
                    }
                })
            } else {
                alert.error("This infomation borrow detail must be not changed.")
            }
        } else {
            BorrowAdd.BorrowAdd(frm).then(res => {
                if (res['0'] === 200) {
                    alert.success(res['payload']['message']);
                    props.history.push('/borrow');
                } else {
                    let obj = res['payload']['message'];
                    for (const key in obj) {
                        for (const k in obj[key]) {
                            alert.error(`${key}: ${obj[key][k]}`)
                        }
                    }
                }
            })
        }

    }

    useEffect(() => {
        if (lstDevice.length === 0) {
            ListDevice.LstDevice().then(res => {
                setLstDevice(res['payload']['lstDevices']);
                device_id.onChange({ target: { type: 'text', value: res['payload']['lstDevices'][0].id } })
            })
        }
        if (props.match.params.id && borrow.length === 0) {
            BorrowView.BorrowView(props.match.params.id).then(res => {
                let borrow = res.payload.borrowDevices;
                console.log(borrow);
                setBorrow(borrow);
                device_id.onChange({ target: { type: 'text', value: borrow.BorrowDevicesDetail.device_id } });
                borrow_reason.onChange({ target: { type: 'text', value: borrow.BorrowDevicesDetail.borrow_reason } });
                return_date_expected.onChange({ target: { type: 'text', value: borrow.BorrowDevicesDetail.return_date_expected } });
                borrow_date.onChange({ target: { type: 'text', value: toShortDate(borrow.BorrowDevicesDetail.borrow_date) } });
            });
        }
    });

    function useFormInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        function hanldeChange(e) {
            setValue(e.target.type === 'checkbox' ? e.target.checked : e.target.value);
        }
        return {
            value,
            onChange: hanldeChange
        };
    }

    var optionDevice = lstDevice.map((device, index) => {
        let result = '';
        if (device.status === 0) {
            result = <option key={index} value={device.id}>{device.name}</option>;
        }
        return result;
    })

    return (
        <div className="row p-20">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                    <legend className="pl-30">{borrow.length!==0?'Update information borrow device':'Add new information borrow device'}</legend><hr />

                    <div className="form-group">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label>Devices:</label>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <select className="form-control"  {...device_id}>
                                {optionDevice}
                            </select>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2">Borrow reason:</label>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <textarea className="form-control" rows="4" {...borrow_reason}></textarea>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-sm-2 control-label">Borrow date:</label>
                        <div className="col-sm-4">
                            <input type="date" className="form-control" required="required" title="Borrow date" {...borrow_date} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Return date expected:</label>
                        <div className="col-sm-4">
                            <input type="datetime-local" className="form-control" required="required" title="Return date expected" {...return_date_expected} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                            <button type="submit" className="btn btn-primary" onClick={onSave}><i className="fa fa-save"></i> Save</button>
                            <Link to="/borrow" className="btn btn-danger ml-10"><i className="fa fa-times"></i> Cancel</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Add;
