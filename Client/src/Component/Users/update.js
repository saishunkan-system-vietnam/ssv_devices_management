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
    const [flg_deleteImg, setFlgDeleteImg] = useState({});
    const alert = useAlert();

    useEffect(() => {
        if(Object.keys(userEdit).length === 0) {
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
        var formData = new FormData();

        formData.append("id", inputId.current.value);
        formData.append("full_name", inputFullName.current.value);
        formData.append("email", inputEmail.current.value);
        formData.append("address", inputAddress.current.value);
        formData.append("dateofbirth", inputDOB.current.value);
        formData.append("joindate", inputJoinDate.current.value);
        formData.append("file", inputImage.current.files[0]);
        if(flg_deleteImg == 1){
            formData.append("deleteImg", 1);
        }

        UpdateProfile.UpdateProfile(formData).then(response => {
            console.log(response['0']);
            if (response['0'] === 200) {
                localStorage.setItem('UserData', response['payload']['userData']);
                    if(response['0'] === 200){
                        alert.success(response['payload']['message']);
                        props.history.push('/user');
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

    function imgUser(baseUrl, img) {
        if(img != null){
            var url = baseUrl + 'uploads/files/users/' + img;
            return <div id={'flgImg'} style={{'padding' : '4px'}}><img src={url} style={{"width": "120px", "height": "120px", 'max-width' : '120px', 'padding' : '4px'}} />
                <input type="button" id="removeImage" value="x" className="btn-rmv" onClick={(event) => {
                    deleteImg(event);
                }}/></div>;
        } else {
            var baseUrl = baseUrl + "img/not-available.jpg";
            return <div id={'flgImg'} style={{'padding' : '4px'}}><img src={baseUrl} style={{"width": "120px", "height": "120px", 'max-width' : '120px', 'padding' : '4px'}} /></div>;
        }
    }

    function deleteImg() {
        document.getElementById('flgImg').style.display = 'none';
        setFlgDeleteImg('1');
    }

    function readURL(e) {
        let files =  e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            if(files[0]){
                deleteImg();
                document.getElementById('showImg').style.display = 'block';
                document.getElementById("showImg").src = e.target.result;
            }
        }
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
                                            {imgUser(userEdit.base_url, userEdit.img)}
                                            <img id="showImg" style={{"width": "120px", "height": "120px", 'max-width' : '120px', 'padding' : '4px', 'display' : 'none'}} />
                                            <div id="deleteImg"></div>
                                            <input ref={inputImage} type="file" id="image" name="file" className="form-control" onChange={(event) => {
                                                readURL(event);
                                            }}/>
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
