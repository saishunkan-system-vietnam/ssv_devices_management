import React, {useState, useEffect} from 'react';
import Item from './Item';
import lstCategory from '../../../api/listcategories';
import '../index.css';

function List() {
    const [lstCategories, setLstCategories] = useState([]);  
    function handleGetLstUsers(){
        lstCategory.lstCategory().then(responseJson => {
            setLstCategories(responseJson['payload']['lstCategories']);
        });
    }   

    useEffect(() => {
        if(lstCategories.length == 0) {
            handleGetLstUsers();
        }
    });  

    var category_item = lstCategories.map((category,index)=>{
        return <Item 
            key = {category.id}
            id = {category.id}
            brands_id = {category.brands_id}
            parent_id = {category.id_parent}
            name = {category.category_name}
            created_user = {category.created_user}
            created_time = {category.created_time}
            update_time = {category.update_time}
            update_user = {category.update_user}
        />
    });

    return (   
            <div>
                <div className="row mt-10">
                    <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
                        
                    </div>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                        <a href='/categories/add' className="btn btn-primary"><i className="fa fa-plus"></i></a>
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
