import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    actionFetchBrandsRequest,
    actionToggleForm,
    actionFilterBrandsRequest
} from '../actions';
import BrandItem from './Item';
import BrandAction from './add';

const List = props => {

    const handleOnChangeShowForm = () => {
        props.toggleForm();
    }

    useEffect(() => {
        props.fetchAllBrands();
    }, [])

    const brandItem = () => {
        let lstBrands = props.brands.data;
        let result = null;
        result = lstBrands ? lstBrands.map((brand, index) => {
            return <BrandItem
                key={index}
                brand={brand}
            />
        }) : null;
        return result;
    }

    const handleOnchangeInputSearch = (e) => {
        props.filterBrands(e.target.value);
    }

    return (
        <>
            {props.brands.toggle_form ? <BrandAction changeShowForm={handleOnChangeShowForm} /> : ""}
            <div className="row mt-10">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 form-inline">
                    <input type="text" className="form-control ml-10" title="Search name" placeholder="Nhập brand name..." onChange={handleOnchangeInputSearch} />
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    {props.brands.toggle_form ? '' : <button onClick={handleOnChangeShowForm} type="button" className="btn btn-primary mr-10"><i className="fa fa-plus"></i> Thêm mới</button>}
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
    return {
        brands: state.brands
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBrands: () => {
            dispatch(actionFetchBrandsRequest());
        },

        toggleForm: () => {
            dispatch(actionToggleForm());
        },

        filterBrands: (brand_name) => {
            dispatch(actionFilterBrandsRequest(brand_name));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
