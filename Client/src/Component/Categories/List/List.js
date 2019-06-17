import React, { useState, useEffect } from 'react';
import Item from './Item';
import DeleteCategory from '../../../api/deletecategory';
import FilterCategory from '../../../api/filtercategory';
import { useAlert } from "react-alert";
import lstCategory from '../../../api/listcategories';
import lstBrands from '../../../api/listbrands';

function List() {
    const [lstCategories, setLstCategories] = useState([]);
    const alert = useAlert();
    const [findCateParent, setFindCateParent] = useState({ name: 'All level categories', leve: -1 }); //-1 all , 1 parent, 2 children
    const [findBrand, setFindBrand] = useState({ name: 'All brands', id: -1 }); //-1 all , id brandid
    const [findCateName, setCateName] = useState(''); //CateName
    const [listBrands, setLstBrands] = useState([]);

    function handleGetLstCategories() {
        lstCategory.lstCategory().then(responseJson => {
            setLstCategories(responseJson['payload']['lstCategories']);
        });
    }

    function handleGetLstBrands() {
        lstBrands.lstBrands().then(responseJson => {
            setLstBrands(responseJson['payload']['lstBrands']);
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
                alert.success("The category has been delete!");
                handleGetLstCategories();
            } else {
                alert.error("The category could not be delete. Please, try again.");
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
            parent_id={category.id_parent === 0 ? 'parent' : 'children'}
            name={category.category_name}
            created_user={category.created_user}
            created_time={category.created_time}
            update_time={category.update_time}
            update_user={category.update_user}
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
            <div className="row mt-10">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-inline">

                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                            {findCateParent.name} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={() => handleChangeCateParent('All level categories', -1)} >All level categories</li>
                            <li onClick={() => handleChangeCateParent('Parent', 1)} >Parent</li>
                            <li onClick={() => handleChangeCateParent('Children', 2)} >Children</li>
                        </ul>
                    </div>

                    <div className="btn-group ml-10">
                        <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                            {findBrand.name} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={() => handleChangeBrand('All brands', -1)} >All brands</li>
                            {ListBrandItem}
                        </ul>
                    </div>

                    <input type="text" className="form-control ml-10" placeholder="Enter name category" value={findCateName} onChange={handleOnChangeCateName} />

                    <a href='/categories/add' className="btn btn-primary ml-10"><i className="fa fa-plus"></i> Add new</a>
                    <hr />
                </div>
            </div>
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Brand</th>
                                <th>id parent</th>
                                <th>Name</th>
                                <th>User created</th>
                                <th>User update</th>
                                <th>Time created</th>
                                <th>Time update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category_item}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default List;
