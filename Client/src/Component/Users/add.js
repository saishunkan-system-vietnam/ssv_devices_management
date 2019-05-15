import React from 'react';

function addUser() {
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
                                    <form action="" method="post" encType="multipart/form-data"
                                          className="form-horizontal">
                                        <div className="row form-group col-lg-8">
                                            <div className="col col-md-3">
                                                <label htmlFor="text-input" className=" form-control-label">User
                                                    Name</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input type="text" id="inputName" name="text-input"
                                                       placeholder="User Name" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="row form-group col-lg-8">
                                            <div className="col col-md-3">
                                                <label htmlFor="text-input" className=" form-control-label">Full
                                                    Name</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input type="text" id="text-input" name="text-input"
                                                       placeholder="Full Name" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="row form-group col-lg-8">
                                            <div className="col col-md-3">
                                                <label htmlFor="text-input"
                                                       className=" form-control-label">Position</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input type="text" id="text-input" name="text-input"
                                                       placeholder="Position" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="row form-group col-lg-8">
                                            <div className="col col-md-3">
                                                <label htmlFor="textarea-input"
                                                       className=" form-control-label">Level</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input type="text" id="text-input" name="text-input" placeholder="Level"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="row form-group col-lg-8">
                                            <div className="col col-md-3">
                                                <label htmlFor="image" className=" form-control-label">Image</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input type="file" id="image" name="image" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="row form-group col-lg-8">
                                            <div className="col col-md-3">
                                                <label htmlFor="text-input"
                                                       className=" form-control-label">Created</label>
                                            </div>
                                            <div className="col-12 col-md-9">
                                                <input type="text" id="text-input" name="text-input"
                                                       placeholder="Created by user" className="form-control"/>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary ">
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

export default addUser;
