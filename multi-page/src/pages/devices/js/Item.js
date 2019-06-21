import React from 'react';
import { status } from './status';

function Item(props) {
  var { device, baseUrl } = props;
  return (
    <tr>
      <td className="text-center">{device.id} </td>
      <td>{device.Categories.category_name} </td>
      <td>{device.Brands.brand_name} </td>
      <td><img style={{ 'maxWidth': '70px', 'padding': '4px' }} src={`${baseUrl}/${device.image ? device.image : '../../../img/not-available.jpg'}`} alt="Image" /> </td>
      <td>{device.name} </td>
      <td>{status(device.status)} </td>
      <td>
        <i onClick={() => { props.set_show(4, device.id) }} className="fa fa-eye fa-lg" ></i><br />
        <i onClick={() => { props.set_show(3, device.id) }} className="fa fa-edit fa-lg"></i><br />
        <i onClick={() => { props.onDelete(device.id); }} className="fa fa-trash fa-lg"></i>
      </td>
    </tr>
  );
}

export default Item;