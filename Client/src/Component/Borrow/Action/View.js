import React, { useState, useEffect } from 'react';
import BorrowView from '../../../api/borrowView';
import { useAlert } from "react-alert";
// import { confirmAlert } from 'react-confirm-alert'; 
// import DeleteCategory from '../../../api/deletecategory';

function View(props) {
    const [borrow, setBorrow] = useState([]);
    const alert = useAlert();

    useEffect(() => {
        get_borrow();
    }, []);

    function get_borrow() {
        console.log(props.match.params.id);
        BorrowView.BorrowView(props.match.params.id).then(responseJson => {
            let borrow = responseJson['payload']['borrowDevices'];
            setBorrow(borrow);
        });
    }
    console.log(borrow);
    // function handleDelete() {
    //     confirmAlert({
    //         customUI: ({ onClose }) => {
    //             var formdata = new FormData();
    //             formdata.append('id', category.id);
    //             return (
    //                 <div className='custom-ui'>
    //                     <h1>Are you sure?</h1>
    //                     <p>You want to delete this category?</p>
    //                     <button onClick={() => DeleteCategory.deleteCategory(formdata).then(responseJson => {
    //                         if (responseJson['0'] === 200) {
    //                             alert.success("The category has been delete!");
    //                             onClose();
    //                             props.history.push('/categories');
    //                         } else {
    //                             alert.error("The category could not be delete. Please, try again.");
    //                             onClose();
    //                         }
    //                     })}>Yes</button>
    //                     <button onClick={onClose}>No</button>
    //                 </div>
    //             )
    //         }
    //     })
    // }

    return (
        <div className="row p-20">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <legend className="pl-30">View borrow</legend>
                <hr />
            </div>


            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ml-70 pl-30">

                <div className="row mt-10" >
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Name:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {/* {category.category_name} */}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Category parent:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {/* {category.id_parent} */}
                    </div>
                </div>

                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Brand:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {/* {category.brands_id} */}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        User created:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {/* {category.created_user} */}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        User update:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {/* {category.update_user} */}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Time created:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {/* {category.created_time} */}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        Time update:
                     </div>
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        {/* {category.update_time} */}
                    </div>
                </div>
                <div className="row  mt-10">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">

                        {/* <a href={`/categories/edit/${category.id}`} className="btn btn-primary">Edit</a>
                        <button type="button" className="btn btn-danger ml-10" onClick={handleDelete}>Delete</button> */}

                    </div>
                </div>
            </div>


        </div>
    );
}

export default View;
