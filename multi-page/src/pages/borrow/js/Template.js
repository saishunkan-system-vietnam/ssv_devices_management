import React, { useState } from 'react';
import '../css/index.css';
import List from './List';
import Add from './Add';
import View from './View';
import NotificationBroken from './notificationBroken';

function index() {
    const [show, setShow] = useState(1) // 1-List 2-Add 3-Edit 4-View 5-NotificationBroken
    const [ID, setID] = useState(null)
    function set_show(_show, id = null) {
        setShow(_show);
        setID(id);
    }
    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <h1 className="text-center pt-30" >QUẢN LÝ MƯỢN THIẾT BỊ</h1>
                <hr />
                {
                    show === 1 ? <List set_show={set_show} /> :
                        show === 2 ? <Add set_show={set_show} /> :
                            show === 3 ? <Add set_show={set_show} id={ID} /> :
                                show === 4 ? <View set_show={set_show} id={ID} /> :
                                    show === 5 ? <NotificationBroken set_show={set_show} id={ID} /> : ""
                }
            </div>
        </div>
    );
}

export default index;
