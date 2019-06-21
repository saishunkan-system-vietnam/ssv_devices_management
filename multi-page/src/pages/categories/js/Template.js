import React, { useState } from 'react';
import '../css/index.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import List from './List';
import Add from './add';
import View from './View';

function Categories(props) {
    const [show, setShow] = useState(1) // 1-List 2-Add 3-Edit 4-View
    const [categoryID, setCategoryID] = useState(null)
    function set_Show(_show, category_id = null) {
        setShow(_show);
        setCategoryID(category_id);
    }
    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <div className="text-center pt-30">
                    <h1>QUẢN LÝ DANH MỤC</h1>
                </div>
                <hr />
                {
                    show === 1 ? <List set_Show={set_Show} /> :
                        show === 2 ? <Add set_Show={set_Show} /> :
                            show === 3 ? <Add set_Show={set_Show} id={categoryID} /> :
                                show === 4 ? <View set_Show={set_Show} id={categoryID} /> : ""
                }
            </div>
        </div>
    );
}

export default Categories;
