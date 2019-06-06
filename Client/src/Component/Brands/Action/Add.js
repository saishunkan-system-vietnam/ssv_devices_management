import React from 'react';

function Add(props) {

    return (
        <div className="row ml-5">
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <form className="form">
                    <legend className="pl-30">Add new</legend><hr />

                    <div className="form-group">
                        <div className="row">
                            <label>Brand name:</label>
                            <input type="text" className="form-control" placeholder="Enter brand name...." />
                            <div className='mt-10'>
                                <button type="button" class="btn btn-primary"><i className="fa fa-save"></i>Save</button>
                                
                                <button type="button" class="btn btn-danger ml-10"><i className="fa fa-times"></i>Cancel</button>
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;