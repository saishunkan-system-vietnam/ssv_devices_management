import React, {useEffect} from 'react';
import UpdateProfile from "../../api/update_profile";
import ShowUser from "../../api/user";
import  {useRef, useState} from 'react';
import { useAlert } from "react-alert";

function UpdateUser(props) {
    const inputId = useRef();
    const inputFullName = useRef();
    const inputEmail = useRef();
    const inputDOB = useRef(null);
    const inputAddress = useRef();
    const inputJoinDate = useRef();
    const inputImage = useRef();
    const [userEdit, setUserEdit] = useState({});

    const alert = useAlert();

    useEffect(() => {
        if(Object.keys(userEdit).length == 0) {
            handleGetUserInfo(props.match.params.id);
        }
    });

    function handleGetUserInfo(id) {
        ShowUser.ShowUser(id).then(responseJson => {
            if (responseJson['0'] === 200 && responseJson['payload']['userData'] !== 'undefined') {
                if(responseJson['0'] === 200){
                    setUserEdit(responseJson['payload']['userData']);
                } else {
                    alert.error(responseJson['payload']['message']);
                }
                //console.log(responseJson);
                //props.history.push('/dashboard');
            } else {
                alert.error(responseJson['payload']['message']);
            }
        });
    }

    function handleUpdate(event) {
        event.preventDefault();
        let params = {};
        params.inputId = inputId.current.value;
        params.inputFullName = inputFullName.current.value;
        params.inputEmail = inputEmail.current.value;
        params.inputDOB = inputDOB.current.value;
        params.inputAddress = inputAddress.current.value;
        params.inputJoinDate = inputJoinDate.current.value;
        params.inputImage = inputImage.current.value;

        UpdateProfile.UpdateProfile(params).then(responseJson => {
            if (responseJson['0'] === 200) {
                localStorage.setItem('UserData', responseJson['payload']['userData']);
                    if(responseJson['0'] === 200){
                        alert.success(responseJson['payload']['message']);
                        props.history.push('/user');
                    } else if(responseJson['0'] === 901){
                        alert.error(responseJson['payload']['message']);
                    }
            } else {console.log(responseJson);
                alert.error(responseJson['payload']['message']);
            }
        });
    }

    function goBack(){
        props.history.goBack();
    }

    return (
        <div className="main-content">
            <div className="section__content section__content--p30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong>Update User Profile</strong>
                                </div>
                                <div className="card-body card-block">
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">User
                                                Name</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input type="text" name="disabledname" placeholder="User Name" className="form-control" disabled value={userEdit.user_name}/>
                                            <input ref={inputId} type="hidden" name="id" placeholder="User Name" className="form-control" value={userEdit.id}/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Full Name</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputFullName} type="text" name="full_name" placeholder="Full Name" className="form-control" defaultValue={userEdit.full_name}/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Email</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputEmail} type="text" name="email" placeholder="Email" className="form-control" defaultValue={userEdit.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">DOB</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputDOB} type="date" name="dateofbirth" placeholder="Date of birth" className="form-control" defaultValue={userEdit.birthdate} />
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Address</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputAddress} type="text" name="address" placeholder="Address" className="form-control" defaultValue={userEdit.address}/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Join Date</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputJoinDate} type="date" name="joindate" placeholder="Address" className="form-control" defaultValue={userEdit.join_date}/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="image" className=" form-control-label">Image</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputImage} type="file" id="image" name="image" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary " onClick={(event) => {
                                        handleUpdate(event);
                                    }}>
                                        <i className="fa fa-dot-circle-o"></i> Submit
                                    </button>
                                    <button type="reset" className="btn btn-danger">
                                        <i className="fa fa-ban"></i> Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <button id="singlebutton" name="singlebutton" className="btn btn-secondary" onClick={(event) => {
                                goBack();
                            }}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                            </button>
                        </div>
                        <div className="col-md-12">
                            <div className="copyright">
                                <p>Copyright © 2018 Colorlib. Saishunkan Co.,Ltd. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
