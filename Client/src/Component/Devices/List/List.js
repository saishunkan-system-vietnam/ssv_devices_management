import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useAlert } from 'react-alert';
import Item from './Item';
import { Link } from 'react-router-dom';

import CategoriesList from '../../../api/listcategories';
import BrandsList from '../../../api/listbrands';

import DevicesList from '../../../api/deviceList';
import DeviceDelete from '../../../api/deviceDelete';
import DeviceFilter from '../../../api/deviceFilter';

import NoData from '../../../common/NoData';

function List() {

    var alert = useAlert();

    const [devices, setDevices] = useState([]);
    const [baseUrl, setBaseUrl] = useState('');
    const [findBrand, setFindBrand] = useState({ name: 'Tất cả hãng', id: -1 }); //-1 all , id brandid
    const [findCategory, setFindCategory] = useState({ name: 'All Categories', id: -1 }); //-1 all , id category
    const [findStatus, setFindStatus] = useState({ name: 'Tất cả trạng thái', id: -1 }); //-1 all , 1 Đang rảnh, 2 Đang bận, 3 maintenancing
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
            BrandsList.lstBrands().then(res => {
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
        />)
    });

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

    function handleChangeBrand(name, id) {
        setFindBrand({ name: name, id: id });
        find(id, findCategory.id, findName, findStatus.id);
    }

    function handleChangeCategory(name, id) {
        setFindCategory({ name: name, id: id })
        find(findBrand.id, id, findName, findStatus.id);
    }

    function onClickFindStatus(name, id) {
        setFindStatus({ name: name, id: id });
        find(findBrand.id, findCategory.id, findName, id);
    }

    function handleChangeName(e) {
        setFindName(e.target.value);
        find(findBrand.id, findCategory.id, e.target.value, findStatus.id);
    }

    function showBrandItem() {
        let brands = '';
        if (lstBrands) {
            brands = lstBrands.map((brand, index) => {
                return <li key={index} onClick={() => handleChangeBrand(brand.brand_name, brand.id)} >{brand.brand_name}</li>
            })
        }
        return brands;
    }

    function ShowCategoryItem() {
        let lstCategoriesItem = '';
        if (lstCategories) {
            lstCategoriesItem = lstCategories.map((category, index) => {
                return <li key={index} onClick={() => handleChangeCategory(category.category_name, category.id)} >{category.category_name}</li>
            })
        }
        return lstCategoriesItem;
    }


    return (
        <div>

            <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 form-inline">
                <div className="btn-group ml-10 mt-10">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                            {findCategory.name} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={() => handleChangeCategory('All categories', -1)} >All categories</li>
                            {ShowCategoryItem()}
                        </ul>
                    </div>

                    <div className="btn-group ml-10 mt-10">
                        <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                            {findBrand.name} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={() => handleChangeBrand('Tất cả hãng', -1)} >Tất cả hãng</li>
                            {showBrandItem()}
                        </ul>
                    </div>

                    <div className="btn-group ml-10 mt-10">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                            {findStatus.name} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={() => onClickFindStatus("Tất cả trạng thái", -1)}>Tất cả trạng thái</li>
                            <li onClick={() => onClickFindStatus("Đang rảnh", 1)}>Đang rảnh</li>
                            <li onClick={() => onClickFindStatus("Đang bận", 2)}>Đang bận</li>
                            <li onClick={() => onClickFindStatus("Đang bảo trì", 3)}>Đang bảo trì</li>
                        </ul>
                    </div>

                    <input type="text" className="form-control ml-10 mt-10" title="Search name" onChange={handleChangeName} value={findName} placeholder="Search device name..." />
                </div>

                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <Link to="/devices/add" className="btn btn-primary mr-10"><i className="fa fa-plus"></i> Thêm mới</Link>
                </div>

            </div>
            <hr />
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table">
                        <thead>
                            <tr>
                                <th  className="text-center">Mã thiết bị</th>
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