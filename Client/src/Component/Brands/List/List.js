import React from 'react';
import BrandItem from './Item';
import BrandAction from '../Action/Add';

function List() {
    return (
        <div>
            <BrandAction />

            <div className="row mt-10">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-inline">
                    <a href='/categories/add' className="btn btn-primary ml-10"><i className="fa fa-plus"></i> Add new</a>
                    <hr />
                </div>
            </div>
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>User created</th>
                                <th>User update</th>
                                <th>Time created</th>
                                <th>Time update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <BrandItem></BrandItem>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default List;