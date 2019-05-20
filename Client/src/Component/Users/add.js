import React from 'react';
import UpdateProfile from "../../api/update_profile";
import AuthServer from "../../api/auth";
import  {useRef} from 'react';

function AddUser(props) {
    const inputName = useRef();
    const inputFullName = useRef();
    const inputEmail = useRef();
    const inputDOB = useRef(null);
    const inputAddress = useRef();
    const inputJoinDate = useRef();
    const inputImage = useRef();

    //get data local Storage
    const [value] = React.useState(
        localStorage.getItem('newUser') || ''
    );

    React.useEffect(() => {
        localStorage.setItem('newUser', value);
    }, [value]);

    function handleUpdate(event) {
        event.preventDefault();
        let params = {};
        params.inputName = inputName.current.value;
        params.inputFullName = inputFullName.current.value;
        params.inputEmail = inputEmail.current.value;
        params.inputDOB = inputDOB.current.value;
        params.inputAddress = inputAddress.current.value;
        params.inputJoinDate = inputJoinDate.current.value;
        params.inputImage = inputImage.current.value;

        UpdateProfile.UpdateProfile(params).then(responseJson => {
            if (responseJson['0'] === 200 && responseJson['payload']['userData'] !== 'undefined') {
                localStorage.setItem('UserData', responseJson['payload']['userData']);
                AuthServer.AuthServer(params).then(responseAuth => {
                    if(responseAuth['0'] === 200){
                        //props.history.push('/dashboard');
                        console.log(responseAuth);
                    } else if(responseAuth['0'] === 901){
                        console.log('Error login');
                    }
                });
                //console.log(responseJson);
                //props.history.push('/dashboard');
            } else {
                console.log(responseJson);
            }
        });
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
                            <button id="singlebutton" name="singlebutton" className="btn btn-secondary">
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
