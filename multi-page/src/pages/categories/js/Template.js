import React from 'react';
import '../css/index.css';
import CategoriesList from './List';
import { BrowserRouter as Router, Route } from "react-router-dom";

function Categories(props) {
    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <div className="text-center pt-30">
                    <h1>QUẢN LÝ DANH MỤC</h1>
                </div>
                <hr />
                <CategoriesList />
            </div>
        </div>
    );
}

export default Categories;
