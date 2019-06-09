import React from 'react';
import {Link} from 'react-router-dom';
import { status } from '../status';

function Item(props) {
  var {device,stt,baseUrl}=props;

  function handleOnClickDelete() {
    props.onDelete(device.id);
  }

  return (
    <tr>
      <td>{stt} </td>
      <td>{device.id} </td>
      <td>{device.Categories.category_name} </td>
      <td>{device.Brands.brand_name} </td>
      <td><img style={{'maxWidth' : '70px', 'padding' : '4px'}} src={`${baseUrl}/${device.image?device.image:'../../../img/not-available.jpg'}`}/> </td>
      <td>{device.name} </td>
      <td>{status(device.status)} </td>
      <td>{device.created_user} </td>
      <td>{device.update_user} </td>
      <td>{device.created_time} </td>
      <td>{device.update_time} </td>
      <td><Link to={`/devices/view/${device.id}`}><i className="fa fa-eye fa-lg" ></i></Link><br/><Link to={`/devices/edit/${device.id}`}><i className="fa fa-edit fa-lg"></i></Link><br/><i onClick={handleOnClickDelete} className="fa fa-trash fa-lg"></i></td>
    </tr>
  );
}

export default Item;