import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { status } from '../status';
import DeviceView from '../../../api/deviceView';
import DeviceDelete from '../../../api/deviceDelete';
import { toShortDate } from '../../../common/date';

function View(props) {

    var alert = useAlert();

    const [device, setCategory] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);

    useEffect(() => {
        if (props.match.params.id && !device) {
            DeviceView.DeviceView(props.match.params.id).then(res => {
                setBaseUrl(res.payload.baseUrl);
                setCategory(res.payload.device);
            })
        }
    });

    function handleDelete() {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append('id', device.id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa Thiết bị?</h1>
                        <button onClick={() => DeviceDelete.DeviceDelete(frm).then(responseJson => {
                            if (responseJson['0'] === 200) {
                                alert.success("The device has been delete!");
                                onClose();
                                props.history.push('/devices');
                            } else {
                                alert.error("The device could not be delete. Please, try again.");
                                onClose();
                            }
                        })}>Xóa</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    return (
        <div className="row p-20">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <legend className="pl-30">Chi tiết thiết bị: <strong>{device ? device.name : ''}</strong></legend>
                <hr />
            </div>

            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-20" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Mã thiết bị:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.id : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thương hiệu:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device && device.Brands ? device.Brands.brand_name : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Danh mục:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device && device.Categories ? device.Categories.category_name : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Hình ảnh:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? <img style={{ 'maxWidth': '100px', 'padding': '4px' }} src={`${baseUrl}/${device.image ? device.image : '../../../img/not-available.jpg'}`} alt="Image" /> : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Tên:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.name : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Serial number:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.serial_number : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Product number:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.product_number : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Trạng thái:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? status(device.status) : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thông số:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.specifications : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Ngày mua:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device && device.purchase_date ? toShortDate(device.purchase_date) : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Hạn bảo hành:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device && device.warranty_period ? toShortDate(device.warranty_period) : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người tạo:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.created_user : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                       Người cập nhập:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.update_user : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian tạo:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? toShortDate(device.created_time) : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian cập nhập:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? toShortDate(device.update_time) : ''}
                    </div>
                </div>


                <div className="row  mt-20">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {device ? <Link to={`/devices/edit/${device.id}`} className="btn btn-primary">Cập nhập</Link> : ''}

                        <button type="button" className="btn btn-danger ml-10" onClick={handleDelete}>Xóa</button>

                        <Link to="/devices" className="btn btn-warning ml-10">Hủy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
