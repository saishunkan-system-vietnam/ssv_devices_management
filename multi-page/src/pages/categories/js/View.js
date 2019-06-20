import React, { useState, useEffect } from 'react';
import getCategory from '../../../api/Categories/category';
import { useAlert } from "react-alert";
import { confirmAlert } from 'react-confirm-alert';
import DeleteCategory from '../../../api/Categories/deletecategory';
import { Link } from 'react-router-dom';
import { toShortDate } from '../../../common/date';

function View(props) {
    const [category, setCategory] = useState([]);
    const alert = useAlert();

    useEffect(() => {
        get_category();
    }, []);

    function get_category() {
        getCategory.getCategory(props.match.params.id).then(responseJson => {
            let category = responseJson['payload']['category'];
            setCategory(category);
        });
    }

    function handleDelete() {
        confirmAlert({
            customUI: ({ onClose }) => {
                var formdata = new FormData();
                formdata.append('id', category.id);
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa Danh mục?</h1>
                        <button onClick={() => DeleteCategory.deleteCategory(formdata).then(responseJson => {
                            if (responseJson['0'] === 200) {
                                alert.success(responseJson.payload.message);
                                onClose();
                                props.history.push('/categories');
                            } else {
                                alert.error(responseJson.payload.message);
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
                <legend className="pl-30">Chi tiết danh mục: <strong>{category.category_name}</strong></legend>
                <hr />
            </div>


            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-10" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Tên Danh mục:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {category.category_name}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Danh mục cha:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {category && category.Category_parent ? category.Category_parent.category_name : ''}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thương hiệu:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {category && category.Brands ? category.Brands.brand_name : ''}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người tạo:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {category.created_user}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Người cập nhập:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {category.update_user}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian tạo:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {toShortDate(category.created_time)}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Thời gian cập nhập:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {toShortDate(category.update_time)}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <a href={`/categories/edit/${category.id}`} className="btn btn-primary">Cập nhập</a>
                        <button type="button" className="btn btn-danger ml-10" onClick={handleDelete}>Xóa</button>
                        <Link to="/categories" className="btn btn-warning ml-10">Hủy</Link>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default View;