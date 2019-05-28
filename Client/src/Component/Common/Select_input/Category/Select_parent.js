import React, {useState, useEffect} from 'react';
import lstCategory from '../../../../api/listcategories';
import Option from '../../../Categories/Action/Option';

function Select() {
    const [lstCategories, setLstCategories] = useState([]);  
    function handleGetLstCategories(){
        lstCategory.lstCategory().then(responseJson => {
            setLstCategories(responseJson['payload']['lstCategories']);
        });
    }   

    useEffect(() => {
        if(lstCategories.length == 0) {
            handleGetLstCategories();
        }
    });  

    var option = lstCategories.map((category,index)=>{
        let result='';
        if(category.id_parent===0){
            result=<Option 
            key = {index}
            value = {category.id}
            label={category.category_name}
        />
        }
        return result;
    });

    return (
        <div>            
            <select name="" className="form-control">
               {option}
            </select>            
        </div>
    );
}

export default Select;
