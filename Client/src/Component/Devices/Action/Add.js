import React, { useState, useEffect } from 'react';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom';

import GetCategories from '../../../api/listcategories';
import GetBrands from '../../../api/brandsList';
import DeviceAdd from '../../../api/deviceAdd';
import DeviceEdit from '../../../api/deviceEdit';
import GetDevice from '../../../api/deviceView';

function Add(props) {

    const [categories, setCategories] = useState(null);
    const [brands, setBrands] = useState(null);

    const categories_id = useFormInput('');
    const serial_number = useFormInput('');
    const product_number = useFormInput('');
    const name = useFormInput('');
    const brand_id = useFormInput('');
    const specifications = useFormInput('');
    const purchase_date = useFormInput('');
    const warranty_period = useFormInput('');
    const [image, setImage] = useState(null);
    const [device, setDevice] = useState(null);
    const [baseUrl, setBaseUrl] = useState(null);

    var alert = useAlert();

    function onSave(e) {
        e.preventDefault();
        // console.log(categories_id);
        // console.log(serial_number);
        // console.log(product_number);
        // console.log(name);
        console.log(brand_id);
        // console.log(specifications);
        // console.log(purchase_date);
        // console.log(warranty_period);
        // console.log(image);

        var frm = new FormData();
        frm.append('categories_id', categories_id.value);
        frm.append('serial_number', serial_number.value);
        frm.append('product_number', product_number.value);
        frm.append('name', name.value);
        frm.append('brand_id', brand_id.value);
        frm.append('specifications', specifications.value);
        frm.append('purchase_date', purchase_date.value);
        frm.append('warranty_period', warranty_period.value);
        frm.append('file', image ? image.file : '');



        if (device) {
            frm.append('id', device.id);
            DeviceEdit.DeviceEdit(frm).then(res => {
                if (res['0'] === 200) {
                    alert.success(res.payload.message);
                    props.history.push('/borrow');
                } else {
                    var obj = res.payload.message;
                    if (typeof obj === 'object') {
                        for (const key in obj) {
                            for (const k in obj[key]) {
                                alert.error(`${key}: ${obj[key][k]}`)
                            }
                        }
                    } else {
                        alert.error(res.payload.message);
                    }
                }
            })
        } else {
            DeviceAdd.DeviceAdd(frm).then(res => {
                if (res['0'] === 200) {
                    alert.success(res.payload.message);
                    props.history.push('/borrow');
                } else {
                    var obj = res.payload.message;
                    if (typeof obj === 'object') {
                        for (const key in obj) {
                            for (const k in obj[key]) {
                                alert.error(`${key}: ${obj[key][k]}`)
                            }
                        }
                    } else {
                        alert.error(res.payload.message);
                    }
                }
            })
        }



    }

    useEffect(() => {
        if (!categories) {
            GetCategories.lstCategory().then(res => {
                setCategories(res.payload.lstCategories);
                categories_id.onChange({ target: { value: res.payload.lstCategories['0'].id } })
            })
        }
        if (!brands) {
            GetBrands.BrandList().then(res => {
                setBrands(res.payload.lstBrands);
                brand_id.onChange({ target: { value: res.payload.lstBrands['0'].id } })
            })
        }
        if (!device && props.match.params) {
            GetDevice.DeviceView(props.match.params.id).then(res => {
                console.log(res);
                let _device = res.payload;
                setBaseUrl(_device.baseUrl);
                setDevice(_device.device);
                categories_id.onChange({ target: { value: _device.device.categories_id } })
                serial_number.onChange({ target: { value: _device.device.serial_number } })
                product_number.onChange({ target: { value: _device.device.product_number } })
                name.onChange({ target: { value: _device.device.name } })
                specifications.onChange({ target: { value: _device.device.specifications } })
                if (_device.device.purchase_date) {
                    purchase_date.onChange({ target: { value: _device.device.purchase_date } })
                }
                if (_device.device.warranty_period) {
                    warranty_period.onChange({ target: { value: _device.device.warranty_period } })
                }

            })
        }
    })

    function useFormInput(initValue) {
        const [value, setValue] = useState(initValue);
        function handleChange(e) {
            setValue(e.target.value);
        }
        return {
            value,
            onChange: handleChange
        }
    }

    function showOptionCategories() {
        let result = '';
        result = categories.map((category, index) => {
            return <option key={index} value={category.id}>{category.category_name}</option>
        })
        return result;
    }

    function showOptionBrands() {
        let result = '';
        result = brands.map((brand, index) => {
            return <option key={index} value={brand.id}>{brand.brand_name}</option>
        })
        return result;
    }

    function onChangeImage(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImage({
                    file: file,
                    path: e.target.result
                });
            }
        } else {
            setImage(null);
        }
    }

    function onCloseImg() {
        setImage(null);
    }

    return (
        <div className="row p-20">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                    {/* <legend className="pl-30">{borrow.length!==0?'Update information borrow device':'Add new information borrow device'}</legend><hr /> */}

                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label>Category:</label>
                                </div>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <select className="form-control" {...categories_id} >
                                        {categories ? showOptionCategories() : ''}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label>Brand:</label>
                                </div>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <select className="form-control" {...brand_id} >
                                        {brands ? showOptionBrands() : ''}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label>Name:</label>
                                </div>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <input type="text" className="form-control" {...name} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label>Image:</label>
                                </div>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ">
                                    <input type="file" className="form-control" onChange={onChangeImage} />
                                    {image ? <div onClick={onCloseImg} className="close-img">x</div> : ''}
                                    <img src={image ? image.path : device ? `${baseUrl}/${device.image?device.image:'../../../img/not-available.jpg'}` : ''} className="img-responsive img" />

                                </div>
                            </div>
                        </div>


                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label>Serial number:</label>
                                </div>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <input type="text" className="form-control" {...serial_number} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <label>Product number:</label>
                                </div>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <input type="text" className="form-control" {...product_number} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4">Specifications:</label>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <textarea className="form-control" rows="2" {...specifications} ></textarea>
                                </div>
                            </div>


                            <div className="form-group">
                                <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4">Purchase date:</label>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <input type="date" className="form-control" required="required" title="Purchase date" {...purchase_date} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-xs-4 col-sm-4 col-md-4 col-lg-4">Warranty period:</label>
                                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <input type="date" className="form-control" required="required" title="Warranty period date" {...warranty_period} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 pl-30">
                            <button type="submit" className="btn btn-primary" onClick={onSave}><i className="fa fa-save"></i> Save</button>
                            <Link to="/borrow" className="btn btn-danger ml-10"><i className="fa fa-times"></i> Cancel</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Add;