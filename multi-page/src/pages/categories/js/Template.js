import React from 'react';
import '../css/index.css';
import CategoriesList from '../js/List'
import { BrowserRouter as Router, Route } from "react-router-dom";

function Categories(props) {
    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <div className="text-center pt-30">
                    <h1>QUẢN LÝ DANH MỤC</h1>
                </div>
                <hr />
                <Router>
                    <Route path="/" render={() => (
                        <CategoriesList />
                    )} exact />
                    <Route path="/add" render={(props) => (
                        <Add_cate {...props} />
                    )} exact />
                    <Route path="/edit/:id" render={(props) => (
                        <Add_cate {...props} />
                    )} exact />
                    <Route path="/view/:id" render={(props) => (
                        <View_cate {...props} />
                    )} exact />
                </Router>
            </div>
        </div>
    );
}

export default Categories;
