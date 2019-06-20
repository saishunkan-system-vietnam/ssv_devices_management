import React from 'react';
import '../css/index.css';
import List from '../js/List';

function index() {

    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <h1 className="text-center pt-30" >QUẢN LÝ THƯƠNG HIỆU</h1>
                <hr />
                <List/>
            </div>
        </div>
    );
}

export default index;