import React, { useState, useEffect } from 'react';
import brandsAdd from '../../api/Brand/brandsAdd';
import { useAlert } from 'react-alert';
import BrandsView from '../../api/Brand/brandsView';
import BrandEdit from '../../api/Brand/brandEdit';

function Add(props) {

    const [brand, setBrand] = useState(null);
    const [brand_name, setBrand_name] = useState('');   

    var alert = useAlert();
    function handleOnClose() {
        setBrand(null);
        setBrand_name('');
        props.changeShowForm();
    }
    useEffect(() => {
        if (props.id && !brand) {
            BrandsView.BrandsView(props.id).then(res => {
                setBrand(res.payload.brand);
                setBrand_name(res.payload.brand.brand_name);
            })
        } else {
            if (props.id && props.id !== brand.id) {
                setBrand(null);
                setBrand_name('');
            }
        }
    });

    function handleOnChange(e) {
        setBrand_name(e.target.value);
    }

    function onSave(e) {
        e.preventDefault();
        var frm = new FormData();
        frm.append("brand_name", brand_name.trim());
        if (brand) {
            frm.append("id", brand.id);
            BrandEdit.BrandsEdit(frm).then(res => {
                if (res['0'] === 200) {
                    props.changeData();
                    alert.success(res.payload.message);
                    handleOnClose();
                } else {
                    var obj = res.payload.message;
                    messageFaild(obj);
                }
            })
        } else {
            brandsAdd.BrandsAdd(frm).then(res => {
                if (res['0'] === 200) {
                    props.changeData();
                    alert.success(res.payload.message);
                    handleOnClose();
                } else {
                    var obj = res.payload.message;
                    messageFaild(obj);
                }
            });
        }

    }

    function messageFaild(obj) {
        if (typeof obj === 'object') {
            for (const key in obj) {
                for (const k in obj[key]) {
                    alert.error(`${obj[key][k]}`);
                }
            }
        } else {
            alert.error(obj);
        }
    }

    return (
        <div className="row ml-5">
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <form className="form">
                    <legend>{brand?'Cập nhập thông tin Thương hiệu':'Thêm mới Thương hiệu'}</legend><hr />

                    <div className="form-group">
                        <div className="row">
                            <label>Tên thương hiệu:</label>
                            <input type="text" className="form-control" placeholder="Nhập tên thương hiệu...." onChange={handleOnChange} value={brand_name} />
                            <div className='mt-10'>
                                <button type="button" className="btn btn-primary" onClick={onSave}><i className="fa fa-save"></i>Lưu</button>

                                <button onClick={handleOnClose} type="button" className="btn btn-danger ml-10"><i className="fa fa-times"></i>Hủy</button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;