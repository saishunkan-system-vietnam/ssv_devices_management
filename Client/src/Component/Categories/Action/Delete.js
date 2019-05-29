import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import DeleteCategory from '../../../api/deletecategory';
import { useAlert } from "react-alert";
 
    function Delete(id) {       
        const alert=useAlert();
        confirmAlert({
            customUI: ({ onClose }) => {
                var formdata=new FormData();
                formdata.append('id',id);
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this category?</p>
                        <button onClick={() => DeleteCategory.deleteCategory(formdata).then(responseJson => {
                            if (responseJson['0'] === 200){
                                onClose();
                                //"The user has been delete!"                               
                            } else {
                                onClose();
                                // "The category could not be deleted. Please, try again."                                
                            }
                        })}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                )
            }
        })
    }  

export default{
    Delete 
}
