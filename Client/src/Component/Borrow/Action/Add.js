import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import BorrowAdd from "../../../api/borrowAdd";
import ListDevice from "../../../api/deviceList";
import ListBrands from '../../../api/brandsList';
import FilterCategory from '../../../api/filtercategory';
import DeviceFilter from '../../../api/deviceFilter';
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
    const [lstCategories, setLstCategories] = useState([]);
    const [lstBrands, setLstBrands] = useState([]);
    const [brand_id, setBrand_id] = useState('');
    const [category_id, setCategory_id] = useState('');

    const alert = useAlert();

    const onSave = (e) => {
        e.preventDefault();
        var frm = new FormData();
        frm.append('device_id', device_id.value);
        frm.append('borrow_reason', borrow_reason.value);
        frm.append('borrow_date', toShortDate(borrow_date.value, true, true));
        frm.append('return_date_expected', toShortDate(return_date_expected.value, true, true));
        if (borrow.length !== 0) {
            frm.append('id', borrow.id);
            if (borrow.BorrowDevicesDetail.status === '0') {
                BorrowEdit.BorrowEdit(frm).then(res => {
                    if (res['0'] === 200) {
                        alert.success(res['payload']['message']);
                        props.history.push('/borrow');
                    } else {
                        let obj = res['payload']['message'];
                        messageFaild(obj);
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
                    messageFaild(obj);
                }
            })
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

        if (lstBrands.length === 0) {
            ListBrands.BrandList().then(res => {
                setLstBrands(res.payload.lstBrands);
            });
        }

        if (lstCategories.length === 0) {
            findCategories();
        }

        if (lstDevice.length === 0) {
            ListDevice.LstDevice().then(res => {
                setLstDevice(res['payload']['lstDevices']);
            })
        }
        if (props.match.params.id && borrow.length === 0) {
            BorrowView.BorrowView(props.match.params.id).then(res => {
                let borrow = res.payload.borrowDevices;
                setBorrow(borrow);
                setBrand_id(borrow.Devices.brand_id);
                findCategories(borrow.Devices.brand_id);
                setCategory_id(borrow.Devices.categories_id);
                device_id.onChange({ target: { type: 'text', value: borrow.BorrowDevicesDetail.device_id } });
                borrow_reason.onChange({ target: { type: 'text', value: borrow.BorrowDevicesDetail.borrow_reason } });
                return_date_expected.onChange({ target: { type: 'text', value: toShortDate(borrow.BorrowDevicesDetail.return_date_expected, false, false, true) } });
                borrow_date.onChange({ target: { type: 'text', value: toShortDate(borrow.BorrowDevicesDetail.borrow_date, false, false, true) } });
            });
        }
    }, []);

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


    function onHandleChangeBrand(e) {
        setBrand_id(e.target.value);
        findCategories(e.target.value);
        findDevices(category_id, e.target.value);
    }

    function onHandleChangeCategory(e) {
        setCategory_id(e.target.value);
        findDevices(e.target.value, brand_id);
    }

    function findCategories(brand_id = "") {
        var frm = new FormData();
        frm.append('brands_id', brand_id);
        FilterCategory.filterCategory(frm).then(res => {
            setLstCategories(res.payload.lstFilter);
        });
    }

    function findDevices(category_id, brand_id) {
        var frm = new FormData();
        frm.append('brand_id', brand_id);
        frm.append('categories_id', category_id);
        DeviceFilter.DeviceFilter(frm).then(res => {
            setLstDevice(res ? res.payload.lstDevices : []);
        });
    }

    var optionBrands = lstBrands.map((brand, index) => {
        return <option key={index} value={brand.id}>{brand.brand_name}</option>;
    })

    var optionCategories = lstCategories.map((category, index) => {
        let result = '';
        if (category.id_parent !== 0) {
            result = <option key={index} value={category.id}>{category.category_name}</option>;
        }
        return result;
    })

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
                    <legend className="pl-30">{borrow.length !== 0 ? 'Cập nhập thông tin mượn đồ' : 'Thêm mới thông tin mượn đồ'}</legend><hr />

                    <div className="form-group">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label>Thương hiệu: </label>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <select className="form-control" onChange={onHandleChangeBrand} value={brand_id}>
                                <option value="" disabled hidden >---Chọn thương hiệu---</option>
                                {optionBrands}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label>Danh mục: </label>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <select className="form-control" disabled={!brand_id ? "disabled" : ''} onChange={onHandleChangeCategory} value={category_id} >
                                <option value="" hidden >---Chọn danh mục---</option>
                                {optionCategories}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label>Thiết bị:</label>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <select className="form-control" disabled={!category_id ? "disabled" : ''}  {...device_id}>
                                <option value="" hidden >---Chọn thiết bị---</option>
                                {optionDevice}
                            </select>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-xs-2 col-sm-2 col-md-2 col-lg-2">Lý do mượn:</label>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <textarea className="form-control" rows="3" {...borrow_reason}></textarea>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-sm-2 control-label">Ngày mượn:</label>
                        <div className="col-sm-4">
                            <input type="datetime-local" className="form-control" required="required" title="Borrow date" {...borrow_date} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">Dự kiến ngày trả:</label>
                        <div className="col-sm-4">
                            <input type="datetime-local" value='2019-06-18 19:00:00' className="form-control" required="required" title="Return date expected" {...return_date_expected} />
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
