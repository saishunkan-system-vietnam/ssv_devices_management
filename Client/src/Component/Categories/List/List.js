import React, { useState, useEffect } from 'react';
import Item from './Item';
import lstCategory from '../../../api/listcategories';
import DeleteCategory from '../../../api/deletecategory';
import { useAlert } from "react-alert";

function List() {
    const [lstCategories, setLstCategories] = useState([]);
    const alert = useAlert();

    function handleGetLstCategories() {
        lstCategory.lstCategory().then(responseJson => {
            setLstCategories(responseJson['payload']['lstCategories']);
        });
    }

    useEffect(() => {
        if (lstCategories.length === 0) {
            handleGetLstCategories();
        }
    });

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

    var category_item = lstCategories.map((category, index) => {
        return <Item
            key={category.id}
            id={category.id}
            brands_id={category.brands_id}
            parent_id={category.id_parent}
            name={category.category_name}
            created_user={category.created_user}
            created_time={category.created_time}
            update_time={category.update_time}
            update_user={category.update_user}
            onDelete={onDelete}
        />
    });

    function onClick(name, level){
        console.log(name +"-"+level);
    }

    return (
        <div>
            <div className="row mt-10">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-inline">

                    <div className="btn-group">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                        All level categories <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={()=>onClick('level',0)} >All level categories</li>
                            <li onClick={()=>onClick('level',1)} >Parent</li>
                            <li onClick={()=>onClick('level',2)} >Children</li>
                        </ul>
                    </div>

                    <div className="btn-group ml-10">
                        <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" id="btnCategory">
                        All brands <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li onClick={()=>onClick('level',0)} >All brands</li>
                            <li onClick={()=>onClick('level',1)} >Parent</li>
                            <li onClick={()=>onClick('level',2)} >Children</li>
                        </ul>
                    </div>

                    <input type="text" className="form-control ml-10" placeholder="Enter name category"/>

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
