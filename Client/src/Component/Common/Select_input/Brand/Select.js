import React, {useState, useEffect} from 'react';
import lstBrands from '../../../../api/listbrands';
import Option from '../../../Categories/Action/Option';

function Select() {
    const [listBrands, setLstBrands] = useState([]);  
    function handleGetLstBrands(){
        lstBrands.lstBrands().then(responseJson => {
            setLstBrands(responseJson['payload']['lstBrands']);
        });
    }   

    useEffect(() => {
        if(listBrands.length == 0) {
            handleGetLstBrands();
        }
    });  
   
    var option = listBrands.map((brand,index)=>{       
        return <Option key={index} label={brand.brand_name} value={brand.id} />
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
