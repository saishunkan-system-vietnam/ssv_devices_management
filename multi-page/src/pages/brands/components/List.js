import React, { useState, useEffect } from 'react';
import BrandItem from './Item';
import BrandAction from './add';
import { confirmAlert } from 'react-confirm-alert';
import BrandFilter from '../../../api/Brand/brandFilter';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';
import { actionFetchBrandsRequest, actionDeleteBrandsRequest } from '../actions';

function List(props) {
    const [showForm, setShowForm] = useState(false);
    const [brand_id, setBrand_id] = useState('');
    var alert = useAlert();

    function handleOnChangeShowForm() {
        setBrand_id(null);
        setShowForm(!showForm);
    }

    useEffect(() => {
        props.fetchAllBrands();
    }, [])

    function onEdit(id) {
        setShowForm(true);
        setBrand_id(id)
    }

    const brandItem = () => {
        let lstBrands = props.brands;
        let result = null;
        result = lstBrands ? lstBrands.map((brand, index) => {
            return <BrandItem
                key={index}
                brand={brand}
                edit={onEdit}
                delete={handleDeleteBrand}
            />
        }) : null;
        return result;
    }

    function handleDeleteBrand(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Bạn đang xóa Thương hiệu?</h1>
                        <button onClick={() => {
                            props.deleteBrand(id);
                            onClose();
                        }}>Xóa</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                )
            }
        })
    }

    function handleOnchangeInputSearch(e) {
        var frm = new FormData();
        frm.append('brand_name', e.target.value);
        BrandFilter.BrandsEdit(frm).then(res => {
            setLstBrands(res.payload.lstBrands);
        })
    }

    return (
        <>
            {showForm ? <BrandAction changeShowForm={handleOnChangeShowForm} id={brand_id} /> : ""}
            <div className="row mt-10">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 form-inline">
                    <input type="text" className="form-control ml-10" title="Search name" placeholder="Nhập brand name..." onChange={handleOnchangeInputSearch} />
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    {showForm ? '' : <button onClick={handleOnChangeShowForm} type="button" className="btn btn-primary mr-10"><i className="fa fa-plus"></i> Thêm mới</button>}
                </div>
                <hr />
            </div>
            <div className="row mt-10">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Mã Thương hiệu</th>
                                <th>Tên thương hiệu</th>
                                <th>Người tạo</th>
                                <th>Người cập nhập</th>
                                <th>Thời gian tạo</th>
                                <th>Thời gian cập nhập</th>
                                <th>Công cụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brandItem()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    console.log(state);
    
    return {
        brands: state.brands
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllBrands: () => {
            dispatch(actionFetchBrandsRequest());
        },
        deleteBrand: (id) => {
            dispatch(actionDeleteBrandsRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
