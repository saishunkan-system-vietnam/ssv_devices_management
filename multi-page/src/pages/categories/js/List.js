import React, { useState, useEffect } from 'react';
import Item from './Item';
import DeleteCategory from '../../../api/Categories/deletecategory';
import FilterCategory from '../../../api/Categories/filtercategory';
import { useAlert } from "react-alert";
import lstCategory from '../../../api/Categories/listcategories';
import lstBrands from '../../../api/Brand/brandsList';
import NoData from '../../../common/NoData';

function List(props) {
    const [lstCategories, setLstCategories] = useState([]);
    const alert = useAlert();
    const [findCateParent, setFindCateParent] = useState(-1); //-1 all , 1 parent, 2 children
    const [findBrand, setFindBrand] = useState(-1); //-1 all , id brandid
    const [findCateName, setCateName] = useState(''); //CateName
    const [listBrands, setLstBrands] = useState([]);

    function handleGetLstCategories() {
        lstCategory.lstCategory().then(responseJson => {
            setLstCategories(responseJson['payload']['lstCategories']);
        });
    }

    function handleGetLstBrands() {
        lstBrands.BrandList().then(responseJson => {
            setLstBrands(responseJson['payload']['lstBrands'] ? responseJson['payload']['lstBrands'] : []);
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

    var ListOptionBrand = listBrands.map((brand, index) => {
        return <option key={index} value={brand.id} >{brand.brand_name}</option>
    });


    var category_item = lstCategories.map((category, index) => {
        return <Item
            key={index}
            id={category.id}
            brands_id={category['Brands'].brand_name}
            parent_id={category.Category_parent && category.Category_parent.category_name ? category.Category_parent.category_name : category.category_name}
            name={category.category_name}
            onDelete={onDelete}
            set_Edit={set_Edit}
            set_View={set_View}
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

    function handleChangeCateParent(e) {
        let level = e.target.value;
        setFindCateParent(level)
        find(level, findBrand, findCateName);
    }
    function handleOnChangeCateName(e) {
        setCateName(e.target.value);
        find(findCateParent, findBrand, e.target.value);
    }
    function handleChangeBrand(e) {
        let id = e.target.value;
        setFindBrand(id)
        find(findCateParent, id, findCateName);
    }

    function AddNew() {
        props.set_Show(2);
    }

    function set_Edit(category_id) {
        props.set_Show(3, category_id)
    }

    function set_View(category_id) {
        props.set_Show(4, category_id)
    }

    return (
        <div>

            <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 form-inline">

                    <div className="btn-group ml-10 mt-10">
                        <select className="form-control" onChange={handleChangeCateParent} value={findCateParent}>
                            <option value={-1}>Tất cả danh mục</option>
                            <option value={1}>Danh mục cha</option>
                            <option value={2}>Danh mục con</option>
                        </select>
                    </div>

                    <div className="btn-group ml-10 mt-10">
                        <select className="form-control" onChange={handleChangeBrand} value={findBrand}>
                            <option value={-1} >Tất cả thương hiệu</option>
                            {ListOptionBrand}
                        </select>
                    </div>

                    <input type="text" className="form-control ml-10 mt-10" placeholder="Nhập tên danh mục..." value={findCateName} onChange={handleOnChangeCateName} />

                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <button onClick={AddNew} className="btn btn-primary mr-10 mt-10"><i className="fa fa-plus"></i> Thêm mới</button>
                </div>
            </div>

            <hr />
            <div className="row mt-10">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Mã danh mục</th>
                                <th>Tên danh mục</th>
                                <th>Thương hiệu</th>
                                <th>Danh mục cha</th>
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
