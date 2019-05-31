import React from 'react';

function Item(props) {

    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.borrower}</td>
            <td>{props.device}</td>
            <td>{props.status}</td>            
            <td>{props.borrow_date}</td>            
            <td>{props.approved_date}</td>            
            <td>{props.delivery_date}</td>            
            <td>{props.return_date}</td>            
            <td>{props.created_user}</td>            
            <td>{props.update_user}</td>            
            <td>{props.created_time}</td>            
            <td>{props.update_time}</td>            
            <td><a href={`/borrow/view/${props.id}`}><i className="fa fa-eye fa-lg"></i></a><i className="fa fa-edit fa-lg"></i><i className="fa fa-trash fa-lg" ></i><i className="fa fa-check-circle fa-lg"></i><i className="fas fa-times-circle fa-lg"></i></td>
        </tr>
    );
}

export default Item;
