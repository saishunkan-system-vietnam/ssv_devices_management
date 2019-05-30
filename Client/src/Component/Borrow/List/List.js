import React, { useState, useEffect } from 'react';
import BorrowItem from './Item';
import List_Borrow from '../../../api/borrowList';

function ListBorrow() {

    const [lstBorrow, setLstBorrow] = useState([]);

    function handleGetLstBorrow() {
        List_Borrow.LstBorrow().then(responseJon => {
            setLstBorrow(responseJon['payload']['lstBorrowDevices']);
        })
    }

    useEffect(() => {
        if (lstBorrow.length === 0) {
            handleGetLstBorrow();
        }
    })

    var listItem = lstBorrow.map((borrow, index) => {
        console.log(borrow);
        let staust_name = '';
        if (Number(borrow.BorrowDevicesDetail.status) === 0) {            
            staust_name = <span className="label label-primary">Borrow request</span>;
        } else if (Number(borrow.BorrowDevicesDetail.status) === 1) {
            staust_name = <span className="label label-success">Borrowing</span>;
        }else if (Number(borrow.BorrowDevicesDetail.status) === 2) {
            staust_name = <span className="label label-default">Borrow faild</span>;
        }else if (Number(borrow.BorrowDevicesDetail.status) === 3) {
            staust_name = <span className="label label-warning">Return request</span>;
        }else if (Number(borrow.BorrowDevicesDetail.status) === 4) {
            staust_name = <span className="label label-danger">Returned</span>;
        }
        console.log(staust_name);
        return <BorrowItem
            key={index}
            id={borrow.id}
            borrower={borrow.Users.full_name}
            device={borrow.Devices.name}
            status={staust_name}
            borrow_date={borrow.BorrowDevicesDetail.borrow_date}
            approved_date={borrow.BorrowDevicesDetail.approved_date}
            delivery_date={borrow.BorrowDevicesDetail.delivery_date}
            return_date={borrow.BorrowDevicesDetail.return_date}
            created_user={borrow.BorrowDevicesDetail.created_user}
            update_user={borrow.BorrowDevicesDetail.update_user}
            created_time={borrow.BorrowDevicesDetail.created_time}
            update_time={borrow.BorrowDevicesDetail.update_time}
        />
    });

    return (
        <div>            
            <div className="row mt-10">
                <button type="button" className="btn btn-primary add ml-10"><i className="fa fa-plus"></i></button>
            </div>
            <div className="row mt-10">
                <div className="table-responsive table-data">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Borrower</th>
                                <th>Device</th>
                                <th>Status</th>
                                <th>Borrow_date</th>
                                <th>approved_date</th>
                                <th>delivery_date</th>
                                <th>return_date</th>
                                <th>created_user</th>
                                <th>update_user</th>
                                <th>created_time</th>
                                <th>update_time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItem}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default ListBorrow;
