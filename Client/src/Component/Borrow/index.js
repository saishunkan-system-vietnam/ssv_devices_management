import React, { useState, useEffect } from 'react';
import './index.css';
import ListBorrow from './List/List';

function index() {

    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <h1 className="text-center" >Borrow Management</h1>
                <hr/>    
                <ListBorrow />
            </div>
        </div>
    );
}

export default index;
