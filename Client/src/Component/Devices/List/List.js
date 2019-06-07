import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useAlert } from 'react-alert';
import Item from './Item';
import {Link} from 'react-router-dom';

import DevicesList from '../../../api/deviceList';

function List() {

    const [devices, setDevices] = useState([]);
    const [baseUrl, setBaseUrl] = useState('');



    useEffect(() => {
        if (devices.length === 0) {
            DevicesList.LstDevice().then(res => {
                setDevices(res.payload.lstDevices);
                setBaseUrl(res.payload.baseUrl)
            });
        }
    });

    // function handleDeleteBrand(id) {
    //     confirmAlert({
    //         customUI: ({ onClose }) => {
    //             var frm = new FormData();
    //             frm.append("id", id);
    //             return (
    //                 <div className='custom-ui'>
    //                     <h1>Are you sure?</h1>
    //                     <p>You want to delete this brand?</p>
    //                     <button onClick={() => BrandDelete.BrandDelete(frm).then(res => {
    //                         if (res['0'] === 200) {
    //                             alert.success(res.payload.message);
    //                             onClose();
    //                             getLstBrand();
    //                         } else {
    //                             alert.error(res.payload.message);
    //                             onClose();
    //                             getLstBrand();
    //                         }
    //                     })}>Yes</button>
    //                     <button onClick={onClose}>No</button>
    //                 </div>
    //             )
    //         }
    //     })
    // }

    const showItem = () => {     
        let result = '';
        result = devices.map((device, index) => {
            return (<Item
                key={index}
                stt={index}
                baseUrl={baseUrl}
                device={device}
            />)
        });
        return result;
    }

    return (
        <div>
            <div className="row mt-10">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-inline">
                    <Link to="/devices/add" className="btn btn-primary ml-10"><i className="fa fa-plus"></i> Add</Link>

                    {/* <input type="text" className="form-control ml-10" title="Search name" placeholder="Search brand name..." onChange={handleOnchangeInputSearch} /> */}

                </div>
                <hr />
            </div>
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>User created</th>
                                <th>User update</th>
                                <th>Time created</th>
                                <th>Time update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showItem()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default List;