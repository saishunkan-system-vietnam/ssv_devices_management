import React, { useState, useEffect } from 'react';
import Item from './Item';
import DeleteCategory from '../../../api/deletecategory';
import FilterCategory from '../../../api/filtercategory';
import { useAlert } from "react-alert";
import lstCategory from '../../../api/listcategories';
import lstBrands from '../../../api/listbrands';
import NoData from '../../../common/NoData';
import { Link } from 'react-router-dom';

function List() {
    const [lstCategories, setLstCategories] = useState([]);
    const alert = useAlert();
    const [findCateParent, setFindCateParent] = useState({ name: 'Tất cả danh mục', leve: -1 }); //-1 all , 1 parent, 2 children
    const [findBrand, setFindBrand] = useState({ name: 'Tất cả thương hiệu', id: -1 }); //-1 all , id brandid
    const [findCateName, setCateName] = useState(''); //CateName
    const [listBrands, setLstBrands] = useState([]);

    function handleGetLstCategories() {
        lstCategory.lstCategory().then(responseJson => {
            setLstCategories(responseJson['payload']['lstCategories']);
        });
    }

    function handleGetLstBrands() {
        lstBrands.lstBrands().then(responseJson => {
            setLstBrands(responseJson['payload']['lstBrands']?responseJson['payload']['lstBrands']:[]);
        });
    }

    useEffect(() => {
        if (lstCategories.length === 0) {
            handleGetLstCategories();
        }
        if (listBrands.length === 0) {
            handleGetLstBrands();
        }
    }, []);

    function onDelete(id) {
        var formdata = new FormData();
        formdata.append('id', id);
        DeleteCategory.deleteCategory(formdata).then(responseJson => {
            if (responseJson['0'] === 200) {
                alert.success(responseJson.payload.message);
                handleGetLstCategories();
            } else {
                alert.error(responseJson.payload.message);
            }
        });
    }

    var ListBrandItem = listBrands.map((brand, index) => {
        return <li key={index} onClick={() => handleChangeBrand(brand.brand_name, brand.id)} >{brand.brand_name}</li>
    });


    var category_item = lstCategories.map((category, index) => {
        return <Item
            key={index}
            id={category.id}
            brands_id={category['Brands'].brand_name}
            parent_id={category.Category_parent && category.Category_parent.category_name ? category.Category_parent.category_name : category.category_name}
            name={category.category_name}
            onDelete={onDelete}
        />
    });

    function find(parent_id, brand_id, name) {
        var frm = new FormData();
        frm.append('id_parent', parent_id);
        frm.append('brands_id', brand_id);
        frm.append('category_name', name);
        FilterCategory.filterCategory(frm).then(responseJson => {
            setLstCategories(responseJson['payload']['lstFilter']);
        });
    }

    function handleChangeCateParent(name, level) {
        setFindCateParent({ name, level })
        find(level, findBrand.id, findCateName);
    }
    function handleOnChangeCateName(e) {
        setCateName(e.target.value);
        find(findCateParent.level, findBrand.id, e.target.value);
    }
    function handleChangeBrand(name, id) {
        setFindBrand({ name, id })
        find(findCateParent.level, id, findCateName);
    }

    return (
        <div>

            <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 form-inline">

                    <div className="btn-group ml-10 mt-10">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                            {findCateParent.name} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={() => handleChangeCateParent('Tất cả danh mục', -1)} >Tất cả danh mục</li>
                            <li onClick={() => handleChangeCateParent('Danh mục cha', 1)} >Danh mục cha</li>
                            <li onClick={() => handleChangeCateParent('Danh mục con', 2)} >Danh mục con</li>
                        </ul>
                    </div>

                    <div className="btn-group ml-10 mt-10">
                        <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                            {findBrand.name} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={() => handleChangeBrand('Tất cả thương hiệu', -1)} >Tất cả thương hiệu</li>
                            {ListBrandItem}
                        </ul>
                    </div>

                    <input type="text" className="form-control ml-10 mt-10" placeholder="Nhập tên danh mục..." value={findCateName} onChange={handleOnChangeCateName} />

                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <Link to='/categories/add' className="btn btn-primary mr-10 mt-10"><i className="fa fa-plus"></i> Thêm mới</Link>
                </div>
            </div>

            <hr />
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Mã danh mục</th>
                                <th>Thương hiệu</th>
                                <th>Danh mục cha</th>
                                <th>Tên danh mục</th>
                                <th>Công cụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category_item}
                        </tbody>
                    </table>
                    {
                        lstCategories.length === 0 &&
                        <NoData />
                    }
                </div>
            </div>
        </div>
    );
}

export default List;
