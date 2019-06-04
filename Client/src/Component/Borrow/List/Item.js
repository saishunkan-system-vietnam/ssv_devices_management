import React from 'react';
import { Link } from 'react-router-dom';
import { toShortDate } from '../../../common/date'

function Item(props) {

    function onDelete() {
        props.onDelete(props.id);
    }
    function onApprove() {
        props.onApprove(props.id);
    }

    return (
        < tr >
            <td > {props.id} </td>
            <td > {props.borrower} </td>
            <td > {props.device} </td>
            <td > {props.status} </td >
            <td > {toShortDate(props.borrow_date)} </td>
            <td > {toShortDate(props.approved_date)} </td>
            <td > {toShortDate(props.delivery_date)}</td>
            <td > {toShortDate(props.return_d)}</ td>
            <td > {props.created_user} </td>
            <td > {props.update_user} </td>
            <td > {props.created_time}</td>
            <td > {props.update_time}</td>
            <td >
                <Link to={`/borrow/view/${props.id}`} > < i className="fa fa-eye fa-lg" > </i></Link >
                <Link to={`/borrow/edit/${props.id}`} > < i className="fa fa-edit fa-lg" > </i></Link >
                <i onClick={onDelete} className="fa fa-trash fa-lg" > </i>
                <i onClick={onApprove} className="fa fa-check-circle fa-lg" > </i>
                <i className="fas fa-times-circle fa-lg" > </i>
            </td >
        </tr>
    );
}

export default Item;