import React from 'react';
import { toShortDate } from '../../../common/date'
import { status } from './status';
import { formatMoney } from '../../../common/fomat';

function Item(props) {
    var { maintenance } = props
    return (
        < tr >
            <td className="text-center" >{maintenance.id}</td>
            <td >{maintenance.Devices.name}</td>
            <td >{status(maintenance.status)}</td>
            <td >{toShortDate(maintenance.broken_date)}</td>
            <td >{maintenance.Users.user_name}</td>
            <td >{maintenance.total_payment ? formatMoney(maintenance.total_payment) : ""}</td>
            <td >
                < i onClick={() => { props.set_show(4, maintenance.id) }} className="fa fa-eye fa-lg" > </i>
                {Number(maintenance.status) !== 0 ? < i onClick={() => { props.set_show(3, maintenance.id) }} className="fa fa-edit fa-lg" > </i> : ''}
                <i onClick={() => { props.onDelete(maintenance.id) }} className="fa fa-trash fa-lg" > </i>
                {Number(maintenance.status) === 0 ? <i onClick={() => { props.onConfirm(maintenance.id) }} className="fa fa-check-circle fa-lg" > </i> : ''}
                {Number(maintenance.status) === 0 ? <i onClick={() => { props.onNoConfirm(maintenance.id) }} className="fas fa-times-circle fa-lg" > </i> : ''}
            </td >
        </tr>
    );
}

export default Item;