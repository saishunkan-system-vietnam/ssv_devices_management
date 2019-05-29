import React, {useRef, useState, useEffect } from 'react';
import lstBrands from '../../../api/listbrands';
import lstCategory from '../../../api/listcategories';
import Option from './Option';
import getCategory from '../../../api/category';
import addCategory from '../../../api/addcategory';
import editCategory from '../../../api/editcategory';
import { useAlert } from "react-alert";

function Add(props) {    
    const name = useRef();
    const isParent = useRef();
    const id_parent = useRef();
    const id_brand = useRef();
    const [listBrands, setLstBrands] = useState([]);
    const [lstCategories, setLstCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const alert = useAlert();

    const onSave = (e) => {
        e.preventDefault();
        var frm = new FormData();
        let idparent = 0;
        if (isParent.current.checked === false) {
            idparent = id_parent.current.value;
        }
        frm.append('id_parent', idparent);
        frm.append('brands_id', id_brand.current.value);
        frm.append('category_name', name.current.value);
        if (category.length!=0) {
            frm.append('id', category.id);
            editCategory.editCategory(frm).then(response => {
                if (response['0'] === 200) {
                    alert.success(response.payload.message);
                    props.history.push('/categories');
                } else {
                    let obj = response.payload.message;
                    for (const key in obj) {
                        for (const k in obj[key]) {
                            alert.error(`${key}: ${obj[key][k]}`)
                        }
                    }
                }
            })
        } else {
            addCategory.addCategory(frm).then(response => {
                if (response['0'] === 200) {
                    alert.success(response.payload.message);
                    props.history.push('/categories');
                } else {
                    let obj = response.payload.message;
                    for (const key in obj) {
                        for (const k in obj[key]) {
                            alert.error(`${key}: ${obj[key][k]}`)
                        }
                    }
                }
            })
        }
    }

    function handleGetLstBrands() {
        lstBrands.lstBrands().then(responseJson => {
            setLstBrands(responseJson['payload']['lstBrands']);
        });
    }
    function handleGetLstCategories() {
        lstCategory.lstCategory().then(responseJson => {
            setLstCategories(responseJson['payload']['lstCategories']);
        });
    }    
    
    function get_category(){
        getCategory.getCategory(props.match.params.id).then(responseJson => {
            let category = responseJson['payload']['category'];          
            setCategory(category);            
        });       
    }

    useEffect(() => {  
        if(category.length==0 && props.match.params.id){
            get_category();
        }        

        if (lstCategories.length === 0) {
            handleGetLstCategories();
        }
        if (listBrands.length === 0) {
            handleGetLstBrands();
        }  
    }, []);
    
    var option_brand = listBrands.map((brand, index) => {
        if(index===0){
            setCategory('a');
        }
        return <Option key={index} label={brand.brand_name} value={brand.id} />
    });

    var option_category_parent = lstCategories.map((category, index) => {
        let result = '';
        if (category.id_parent === 0) {
            result = <Option
                key={index}
                value={category.id}
                label={category.category_name}
            />
        }
        return result;
    });   
console.log(category.brands_id);
    return (
        <div className="row p-20">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                    <legend className="pl-30">{category?'Update category':'Add new category'}</legend><hr />

                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                                <label>Category name:</label>
                            </div>
                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <input type="text" className="form-control" id="namecate" placeholder="Input field" ref={name} defaultValue={category.category_name}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                                <label>Brand:</label>
                            </div>
                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <select name="" className="form-control" ref={id_brand} defaultValue={category.brands_id} >
                                    {option_brand}                                   
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={isParent === true ? "form-group hide" : "form-group"}>
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                                <label>Category parent:</label>
                            </div>
                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <select id="id_parent" className="form-control" ref={id_parent} >
                                    {option_category_parent}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group" >
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" ref={isParent} />
                                        &nbsp; Category parent
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                            <button type="submit" className="btn btn-primary" onClick={onSave}><i className="fa fa-save"></i> Save</button>
                            <a href="/categories" className="btn btn-danger ml-10"><i className="fa fa-times"></i> Cancel</a>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Add;
