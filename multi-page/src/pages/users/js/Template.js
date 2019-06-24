import React, { useState } from 'react';
import List from './list';
import Edit from './update';

function index() {
    const [show, setShow] = useState(1); //1-List 3-Edit
    const [userID, setUserID] = useState(null);

    function set_show(_show, _userID = null) {
        setShow(_show);
        setUserID(_userID);
    }

    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <h1 className="text-center pt-30" >QUẢN LÝ NGƯỜI DÙNG</h1>
                <hr />
                {
                    show === 1 ? <List set_show={set_show} /> :
                    show === 3 ? <Edit set_show={set_show} id={userID} /> : ""
                }
            </div>
        </div>
    );
}

export default index;
