import React, { useState, useEffect } from 'react';
import BrandItem from './Item';
import BrandAction from '../Action/Add';
import BrandList from '../../../api/brandsList';
import { confirmAlert } from 'react-confirm-alert';
import BrandDelete from '../../../api/brandDelete';
import BrandFilter from '../../../api/brandFilter';
import { useAlert } from 'react-alert';

function List() {

    const [showForm, setShowForm] = useState(false);
    const [lstBrands, setLstBrands] = useState([])
    const [brand_id, setBrand_id] = useState('');

    var alert = useAlert();

    function handleOnChangeShowForm() {
        setShowForm(!showForm);
    }

    function getLstBrand() {
        BrandList.BrandList().then(res => {
            setLstBrands(res.payload.lstBrands);
        })
    }

    useEffect(() => {
        if (lstBrands.length === 0) {
            getLstBrand();
        }
    })

    function onEdit(id) {
        setShowForm(true);
        setBrand_id(id)
    }

    var brandItem = lstBrands.map((brand, index) => {
        return <BrandItem
            key={index}
            index={index + 1}
            brand={brand}
            edit={onEdit}
            delete={handleDeleteBrand}
        />
    });

    function handleDeleteBrand(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
                var frm = new FormData();
                frm.append("id", id);
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this brand?</p>
                        <button onClick={() => BrandDelete.BrandDelete(frm).then(res => {
                            if (res['0'] === 200) {
                                alert.success(res.payload.message);
                                onClose();
                                getLstBrand();
                            } else {
                                alert.error(res.payload.message);
                                onClose();
                                getLstBrand();
                            }
                        })}>Yes</button>
                        <button onClick={onClose}>No</button>
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
        <div>
            {showForm ? <BrandAction changeShowForm={handleOnChangeShowForm} id={brand_id} changeData={getLstBrand} /> : ""}
            <div className="row mt-10">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-inline">
                    {showForm ? '' : <button onClick={handleOnChangeShowForm} type="button" className="btn btn-primary ml-10"><i className="fa fa-plus"></i> Add</button>}

                    <input type="text" className="form-control ml-10" title="Search name" placeholder="Search brand name..." onChange={handleOnchangeInputSearch} />

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
                                <th>Name</th>
                                <th>User created</th>
                                <th>User update</th>
                                <th>Time created</th>
                                <th>Time update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brandItem}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default List;