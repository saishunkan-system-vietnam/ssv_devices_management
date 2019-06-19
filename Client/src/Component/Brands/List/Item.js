import React from 'react';
import { toShortDate } from '../../../common/date';

function Item(props) {

  function onEdit() {
    props.edit(props.brand.id);
  }

  function handleOnClickDelete() {
    props.delete(props.brand.id);
  }

  return (
    <tr>
      <td className="text-center">{props.brand.id} </td>
      <td>{props.brand.brand_name} </td>
      <td>{props.brand.created_user} </td>
      <td>{props.brand.update_user} </td>
      <td>{toShortDate(props.brand.created_time)} </td>
      <td>{toShortDate(props.brand.update_time)} </td>
      <td><i onClick={onEdit} className="fa fa-edit fa-lg"></i><i onClick={handleOnClickDelete} className="fa fa-trash fa-lg"></i></td>
    </tr>
  );
}

export default Item;
