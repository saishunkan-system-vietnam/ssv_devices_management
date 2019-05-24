import React from 'react';
import UpdateProfile from "../../api/update_profile";
import AuthServer from "../../api/auth";
import  {useRef} from 'react';
import { useAlert } from "react-alert";

function AddUser(props) {
    const inputName = useRef();
    const inputFullName = useRef();
    const inputEmail = useRef();
    const inputDOB = useRef(null);
    const inputAddress = useRef();
    const inputJoinDate = useRef();
    const inputImage = useRef();
    const alert = useAlert();

    //get data local Storage
    const [value] = React.useState(
        localStorage.getItem('newUser') || ''
    );
    const [statusCode] = React.useState(
        localStorage.getItem('statusUserCode') || ''
    );

    React.useEffect(() => {
        localStorage.setItem('newUser', value);
    }, [value]);

    if(statusCode == 200){
        alert.info('You can not access this page.');
        props.history.push('/dashboard');
    }
    function handleUpdate(event) {
        event.preventDefault();
        var formData = new FormData();

        formData.append("user_name", inputName.current.value);
        formData.append("full_name", inputFullName.current.value);
        formData.append("email", inputEmail.current.value);
        formData.append("address", inputAddress.current.value);
        formData.append("dateofbirth", inputDOB.current.value);
        formData.append("joindate", inputJoinDate.current.value);
        formData.append("file", inputImage.current.files[0]);

        UpdateProfile.UpdateProfile(formData).then(response => {
            console.log(response['0']);
            if (response['0'] === 200) {
                localStorage.setItem('UserData', response['payload']['userData']);
                if(response['0'] === 200){
                    alert.success(response['payload']['message']);
                    props.history.push('/dashboard');
                } else if(response['0'] === 901){
                    alert.error(response['payload']['message']);
                }
            } else {
                alert.error(response['payload']['message']);
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
                                    <strong>Add User</strong>
                                </div>
                                <div className="card-body card-block">
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">User
                                                Name</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input type="text" name="disabledname"
                                                   placeholder="User Name" className="form-control" disabled
                                                   value={value}/>
                                            <input ref={inputName} type="hidden" id="inputName" name="username"
                                                   placeholder="User Name" className="form-control" value={value}/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Full
                                                Name</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputFullName} type="text" id="text-input" name="full_name"
                                                   placeholder="Full Name" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Email</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputEmail} type="text" id="text-input" name="email"
                                                   placeholder="Email" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">DOB</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputDOB} type="date" id="text-input" name="dateofbirth"
                                                   placeholder="Date of birth" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Address</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputAddress} type="text" id="text-input" name="address"
                                                   placeholder="Address" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="text-input" className=" form-control-label">Join
                                                Date</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputJoinDate} type="date" id="text-input" name="joindate"
                                                   placeholder="Address" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row form-group col-lg-8">
                                        <div className="col col-md-3">
                                            <label htmlFor="image" className=" form-control-label">Image</label>
                                        </div>
                                        <div className="col-12 col-md-9">
                                            <input ref={inputImage} type="file" id="image" name="file" className="form-control"/>
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

export default AddUser;
