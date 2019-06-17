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

    function onNoApprove() {
        props.onNoApprove(props.id);
    }

    function returnDevice() {
        props.returnDevice(props.id);
    }

    function confirmReturnDevice() {
        props.confirmReturnDevice(props.id);
    }

    return (
        <tr>
            <td> {props.id} </td>
            <td> {props.borrower} </td>
            <td> {props.device} </td>
            <td> {props.status} </td >
            <td> {toShortDate(props.borrow_date)} </td>
            <td> {toShortDate(props.approved_date)} </td>
            <td> {toShortDate(props.return_date_expected)}</td>
            <td> {toShortDate(props.return_date)}</ td>
            <td>
                <Link to={`/borrow/view/${props.id}`}> <i className="fa fa-eye fa-lg" > </i></Link >
                {Number(props.status_code) === 0 ? <Link to={`/borrow/edit/${props.id}`} > < i className="fa fa-edit fa-lg" > </i></Link > : ''}
                {Number(props.status_code) !== 1 && Number(props.status_code) !== 3 ? <i onClick={onDelete} className="fa fa-trash fa-lg" > </i> : ''}
                {Number(props.status_code) === 0 ? <i onClick={onApprove} className="fa fa-check-circle fa-lg" > </i> : ''}
                {Number(props.status_code) === 0 ? <i onClick={onNoApprove} className="fas fa-times-circle fa-lg" > </i> : ''}
                {Number(props.status_code) === 1 ? <i onClick={returnDevice} className="fas fa-undo fa-lg"></i> : ''}
                {Number(props.status_code) === 3 ? <i onClick={confirmReturnDevice} className="far fa-calendar-check fa-lg"></i> : ''}
                {Number(props.status_code) === 1 ? <Link to={`/borrow/notification_broken/${props.device_id}`} ><i className="fas fa-exclamation-triangle fa-lg"></i></Link> : ''}
            </td>
        </tr>
    );
}

export default Item;
