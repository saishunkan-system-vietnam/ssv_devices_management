import React from 'react';
import { Link } from 'react-router-dom';
import { toShortDate } from '../../../common/date'
import { status } from '../status';

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
            <td >{stt}</td>
            <td >{maintenance.id}</td>
            <td >{maintenance.Devices.name}</td>
            <td >{status(maintenance.status)}</td>
            <td >{toShortDate(maintenance.broken_date)}</td>
            <td >{maintenance.Users.user_name}</td>
            <td >{maintenance.total_payment ? maintenance.total_payment.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ""}</td>
            <td >{maintenance.create_user}</td>
            <td >{maintenance.update_user}</td>
            <td >{maintenance.create_time}</td>
            <td >{maintenance.update_time}</td>
            <td >
                <Link to={`/maintenance/view/${maintenance.id}`} > < i className="fa fa-eye fa-lg" > </i></Link >
                <Link to={`/maintenance/edit/${maintenance.id}`} > < i className="fa fa-edit fa-lg" > </i></Link >
                <i onClick={onDelete} className="fa fa-trash fa-lg" > </i>
                {Number(maintenance.status) === 0 ? <i onClick={onConfirm} className="fa fa-check-circle fa-lg" > </i> : ''}
                {Number(maintenance.status) === 0 ? <i onClick={onNoConfirm} className="fas fa-times-circle fa-lg" > </i> : ''}
                {/* {Number(props.status_code) === 1 ? <i onClick={returnDevice} className="fas fa-undo fa-lg"></i> : ''}
                {Number(props.status_code) === 3 ? <i onClick={confirmReturnDevice} className="far fa-calendar-check fa-lg"></i> : ''}
                {Number(props.status_code) === 1 ? <Link to={`/borrow/notification_broken/${props.device_id}`} ><i className="fas fa-exclamation-triangle fa-lg"></i></Link> : ''} */}
            </td >
        </tr>
    );
}

export default Item;