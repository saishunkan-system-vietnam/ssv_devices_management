import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { status } from '../status';
import DeviceView from '../../../api/deviceView';

function View(props) {

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
    console.log(device);

    // function handleDelete() {
    //     confirmAlert({
    //         customUI: ({ onClose }) => {
    //             var frm = new FormData();
    //             frm.append('id', borrow.id);
    //             return (
    //                 <div className='custom-ui'>
    //                     <h1>Are you sure?</h1>
    //                     <p>You want to delete this borrow?</p>
    //                     <button onClick={() => BorrowDelete.BorrowDelete(frm).then(responseJson => {
    //                         if (responseJson['0'] === 200) {
    //                             alert.success("The infomation borrow has been delete!");
    //                             onClose();
    //                             props.history.push('/borrow');
    //                         } else {
    //                             alert.error("The infomation borrow could not be delete. Please, try again.");
    //                             onClose();
    //                         }
    //                     })}>Yes, Delete borrow!</button>
    //                     <button onClick={onClose}>No</button>
    //                 </div>
    //             )
    //         }
    //     })
    // }

    const handleClickName = () => {

    }

    const handleClickDevice = () => {

    }

    return (
        <div className="row p-20">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <legend className="pl-30">View Device</legend>
                <hr />
            </div>

            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-20" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        ID:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.id : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Category:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device && device.Categories ? device.Categories.category_name : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Brand:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device && device.Brands ? device.Brands.brand_name : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Image
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? <img style={{ 'maxWidth': '100px', 'padding': '4px' }} src={`${baseUrl}/${device.image ? device.image : '../../../img/not-available.jpg'}`} /> : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Name
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
                        Status:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? status(device.status) : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Sepecifications:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.specifications : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Purchase date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.purchase_date : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Warranty period date:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.warranty_period : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Created user:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.created_user : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Update user:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.update_user : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Created time:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.created_time : ''}
                    </div>
                </div>

                <div className="row  mt-20">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Update Time:
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {device ? device.update_time : ''}
                    </div>
                </div>


                <div className="row  mt-20">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {device? <Link to={`/devices/edit/${device.id}`} className="btn btn-primary">Edit</Link> : ''}
                        <Link to="/devices" className="btn btn-warning ml-10">Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
