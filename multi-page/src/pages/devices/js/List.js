import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useAlert } from 'react-alert';
import Item from './Item';

import CategoriesList from '../../../api/Categories/listcategories';
import BrandsList from '../../../api/Brand/brandsList';

import DevicesList from '../../../api/Devices/deviceList';
import DeviceDelete from '../../../api/Devices/deviceDelete';
import DeviceFilter from '../../../api/Devices/deviceFilter';

import NoData from '../../../common/NoData';

function List(props) {

    var alert = useAlert();

    const [devices, setDevices] = useState([]);
    const [baseUrl, setBaseUrl] = useState('');
    const [findBrand, setFindBrand] = useState(-1); //-1 all , id brandid
    const [findCategory, setFindCategory] = useState(-1); //-1 all , id category
    const [findStatus, setFindStatus] = useState(-1); //-1 all , 1 Đang rảnh, 2 Đang bận, 3 maintenancing
    const [findName, setFindName] = useState('');
    const [lstBrands, setLstBrands] = useState(null);
    const [lstCategories, setLstCategories] = useState(null);

    function getLstDevices() {
        DevicesList.LstDevice().then(res => {
            setDevices(res ? res.payload.lstDevices : null);
            setBaseUrl(res ? res.payload.baseUrl : null);
        });
    }

    useEffect(() => {
        if (devices.length === 0) {
            getLstDevices();
        }
        if (!lstBrands) {
            BrandsList.BrandList().then(res => {
                setLstBrands(res ? res.payload.lstBrands : null);
            })
        }
        if (!lstCategories) {
            CategoriesList.lstCategory().then(res => {
                setLstCategories(res ? res.payload.lstCategories : null);
            })
        }
    }, []);

    function handleDeleteBrand(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append("id", id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa thiết bị?</h1>
                        <button onClick={() => DeviceDelete.DeviceDelete(frm).then(res => {
                            if (res['0'] === 200) {
                                alert.success(res.payload.message);
                                onClose();
                                getLstDevices();
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

    var showItem = devices.map((device, index) => {
        return (<Item
            key={index}
            baseUrl={baseUrl}
            device={device}
            onDelete={handleDeleteBrand}
            set_show={setShow}
        />)
    });

    function setShow(show, device_id) {
        props.set_show(show, device_id);
    }

    function find(brand_id, categories_id, name, status) {
        var frm = new FormData();
        frm.append('brand_id', brand_id);
        frm.append('categories_id', categories_id);
        frm.append('name', name);
        frm.append('status', status);
        DeviceFilter.DeviceFilter(frm).then(res => {
            setDevices(res ? res.payload.lstDevices : []);
            setBaseUrl(res ? res.payload.baseUrl : '');
        });
    }

    function handleChangeBrand(e) {
        let id = e.target.value;
        setFindBrand(id);
        find(id, findCategory, findName, findStatus);
    }

    function handleChangeCategory(e) {
        let id = e.target.value;
        setFindCategory(id)
        find(findBrand, id, findName, findStatus);
    }

    function onChangeStatus(e) {
        let id = e.target.value;
        setFindStatus(id);
        find(findBrand, findCategory, findName, id);
    }

    function handleChangeName(e) {
        setFindName(e.target.value);
        find(findBrand, findCategory, e.target.value, findStatus);
    }

    function showBrandItem() {
        let brands = '';
        if (lstBrands) {
            brands = lstBrands.map((brand, index) => {
                return <option key={index} value={brand.id} >{brand.brand_name}</option>
            })
        }
        return brands;
    }

    function ShowCategoryItem() {
        let lstCategoriesItem = '';
        if (lstCategories) {
            lstCategoriesItem = lstCategories.map((category, index) => {
                return <option key={index} value={category.id} >{category.category_name}</option>
            })
        }
        return lstCategoriesItem;
    }


    return (
        <div>

            <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 form-inline">
                    <div className="btn-group ml-10 mt-10">
                        <select className="form-control" onChange={handleChangeCategory} value={findCategory}>
                            <option value={-1}>Tất cả danh mục</option>
                            {ShowCategoryItem()}
                        </select>
                    </div>

                    <div className="btn-group ml-10 mt-10">
                        <select className="form-control" onChange={handleChangeBrand} value={findBrand}>
                            <option value={-1}>Tất cả thương hiệu</option>
                            {showBrandItem()}
                        </select>
                    </div>

                    <div className="btn-group ml-10 mt-10">
                        <select className="form-control" onChange={onChangeStatus} value={findStatus}>
                            <option value={-1}>Tất cả trạng thái</option>
                            <option value={1}>Đang rảnh</option>
                            <option value={2}>Đang bận</option>
                            <option value={3}>Đang bảo trì</option>
                        </select>
                    </div>

                    <input type="text" className="form-control ml-10 mt-10" title="Search name" onChange={handleChangeName} value={findName} placeholder="Nhập tên thiết bị..." />
                </div>

                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <button onClick={() => { props.set_show(2) }} className="btn btn-primary mt-10 mr-10"><i className="fa fa-plus"></i> Thêm mới</button>
                </div>

            </div>
            <hr />
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Mã thiết bị</th>
                                <th>Danh mục</th>
                                <th>Thương hiệu</th>
                                <th>Hình Ảnh</th>
                                <th>Tên thiết bị</th>
                                <th>Trạng thái</th>
                                <th>Công cụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showItem}
                        </tbody>
                    </table>
                    {
                        devices.length === 0 &&
                        <NoData />
                    }
                </div>
            </div>
        </div>
    );
}
export default List;