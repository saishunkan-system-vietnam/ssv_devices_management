import React from 'react';
import { Link } from 'react-router-dom';
import { toShortDate } from '../../../common/date'
import { status } from '../status';
import { formatMoney } from '../../../common/fomat';

function Item(props) {

    var { maintenance, stt } = props

    function onDelete() {
        props.onDelete(maintenance.id);
    }

    function onConfirm() {
        props.onConfirm(maintenance.id);
    }

    function onNoConfirm() {
        props.onNoConfirm(maintenance.id);
    }

    return (
        < tr >
            <td className="text-center" >{maintenance.id}</td>
            <td >{maintenance.Devices.name}</td>
            <td >{status(maintenance.status)}</td>
            <td >{toShortDate(maintenance.broken_date)}</td>
            <td >{maintenance.Users.user_name}</td>
            <td >{maintenance.total_payment ? formatMoney(maintenance.total_payment) : ""}</td>
            <td >
                <Link to={`/maintenance/view/${maintenance.id}`} > < i className="fa fa-eye fa-lg" > </i></Link >
                {Number(maintenance.status) !== 0 ? <Link to={`/maintenance/edit/${maintenance.id}`} > < i className="fa fa-edit fa-lg" > </i></Link > : ''}
                <i onClick={onDelete} className="fa fa-trash fa-lg" > </i>
                {Number(maintenance.status) === 0 ? <i onClick={onConfirm} className="fa fa-check-circle fa-lg" > </i> : ''}
                {Number(maintenance.status) === 0 ? <i onClick={onNoConfirm} className="fas fa-times-circle fa-lg" > </i> : ''}
            </td >
        </tr>
    );
}

export default Item;