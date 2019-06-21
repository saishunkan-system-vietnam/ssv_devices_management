import React from 'react';
import { toShortDate } from '../../../common/date'

function Item(props) {

    return (
        <tr>
            <td className="text-center"> {props.id} </td>
            <td> {props.borrower} </td>
            <td> {props.device} </td>
            <td> {props.status} </td >
            <td> {toShortDate(props.borrow_date)} </td>
            <td> {toShortDate(props.approved_date)} </td>
            <td> {toShortDate(props.return_date_expected)}</td>
            <td> {toShortDate(props.return_date)}</ td>
            <td>
                <i onClick={() => { props.set_show(4, props.id) }} className="fa fa-eye fa-lg" > </i>
                {Number(props.status_code) !== 0 ? <  i onClick={() => { props.set_show(3, props.id) }} className="fa fa-edit fa-lg" > </i> : ''}
                {Number(props.status_code) !== 1 && Number(props.status_code) !== 3 ? <i onClick={() => { props.onDelete(props.id) }} className="fa fa-trash fa-lg" > </i> : ''}
                {Number(props.status_code) === 0 ? <i onClick={() => { props.onApprove(props.id) }} className="fa fa-check-circle fa-lg" > </i> : ''}
                {Number(props.status_code) === 0 ? <i onClick={() => { props.onNoApprove(props.id) }} className="fas fa-times-circle fa-lg" > </i> : ''}
                {Number(props.status_code) === 3 ? <i onClick={() => { props.confirmReturnDevice(props.id) }} className="far fa-calendar-check fa-lg"></i> : ''}
                {Number(props.status_code) === 1 ? <i onClick={() => { props.returnDevice(props.id) }} className="fas fa-undo fa-lg"></i> : ''}
                {Number(props.status_code) === 1 ? <i onClick={() => { props.set_show(5, props.device_id) }} className="fas fa-exclamation-triangle fa-lg"></i> : ''}
            </td>
        </tr>
    );
}

export default Item;
