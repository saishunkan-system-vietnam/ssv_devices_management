import React, {useState, useEffect} from 'react';
import lstBrands from '../../../../api/listcategories';

function Select() {
    const [lstBrands, setLstBrands] = useState([]);  
    function handleGetLstBrands(){
        lstBrands.lstBrands().then(responseJson => {
            setLstBrands(responseJson['payload']['lstBrands']);
        });
    }   

    useEffect(() => {
        if(lstBrands.length == 0) {
            handleGetLstBrands();
        }
    });  

    var category_item = lstBrands.map((brand,index)=>{
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

    );
}

export default Select;
