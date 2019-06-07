import React, { useState, useEffect } from 'react';
import lstBrands from '../../../api/listbrands';
import lstCategory from '../../../api/listcategories';
import Option from './Option';
import getCategory from '../../../api/category';
import addCategory from '../../../api/addcategory';
import editCategory from '../../../api/editcategory';
import { useAlert } from "react-alert";

function Add(props) {   
    const [id, setID] = useState('');
    const name = useFormInput('');
    const isParent = useFormInput(false);
    const id_parent = useFormInput('');
    const id_brand = useFormInput('');
    const [listBrands, setLstBrands] = useState([]);
    const [lstCategories, setLstCategories] = useState([]);
    const alert = useAlert();
    

    const onSave = (e) => {
        e.preventDefault();
        var frm = new FormData();
        let idparent = 0;
        if (isParent.value === false) {
            idparent = id_parent.value;
        }
        console.log(idparent);
        frm.append('id_parent', idparent);
        frm.append('brands_id', id_brand.value);
        frm.append('category_name', name.value);
        if (id) {
            frm.append('id', id);
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
            id_brand.onChange({target:{type:'text',value:responseJson['payload']['lstBrands'][0].id}});
        });
    }
    function handleGetLstCategories() {
        lstCategory.lstCategory().then(responseJson => {
            let lstCate=responseJson['payload']['lstCategories'];
            setLstCategories(lstCate);   
            if(lstCate.length>0){
               for(let i=0;i<lstCate.length;i++){
                    if(lstCate[i].id_parent===0 ){
                        id_parent.onChange({target:{type:'text',value:responseJson['payload']['lstCategories'][i].id}});
                        break;
                    }                    
                }
            }              
        });
    }    
    
    function get_category(){
        getCategory.getCategory(props.match.params.id).then(responseJson => {
            let category = responseJson['payload']['category'];
            setID(category.id);
            name.onChange({target:{type:'text',value:category.category_name}});
            id_brand.onChange({target:{type:'text',value:category.brands_id}});
            console.log(isParent);
            if(category.id_parent===0){
                 isParent.onChange({target:{type:'checkbox', checked: true}});
            }else{
                id_parent.onChange({target:{type:'text',value:category.id_parent}});
           }
           
        });       
    }

    useEffect(() => {  
        if(id==='' && props.match.params.id){
            get_category();
        }        

        if (lstCategories.length === 0) {
            handleGetLstCategories();
        }
        if (listBrands.length === 0) {
            handleGetLstBrands();
        }  
    },[]);
    
    var option_brand = listBrands.map((brand, index) => {
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

    function useFormInput(initialValue){
        const [value, setValue]=useState(initialValue);
        function hanldeChange(e){
            setValue( e.target.type === 'checkbox' ? e.target.checked : e.target.value);   
        }
        return {
            value,
            onChange: hanldeChange
        };
    }

    return (
        <div className="row p-20">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form>
                    <legend className="pl-30">{id?'Update category':'Add new category'}</legend><hr />

                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                                <label>Category name:</label>
                            </div>
                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <input type="text" className="form-control" placeholder="Enter category name...." {...name} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                                <label>Brand:</label>
                            </div>
                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <select className="form-control" {...id_brand} >
                                    {option_brand}                                   
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={isParent.value === true ? "form-group hide" : "form-group"}>
                        <div className="row">
                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pl-30">
                                <label>Category parent:</label>
                            </div>
                            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                <select className="form-control" {...id_parent} >
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
                                        <input type="checkbox" {...isParent} checked={isParent.value===true} />
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