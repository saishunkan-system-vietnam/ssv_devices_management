import React from 'react';

function Item(props) {

  function onEdit() {
    props.edit(props.brand.id);
  }

  function handleOnClickDelete() {
    props.delete(props.brand.id);
  }

  return (
    <tr>
      <td>{props.index} </td>
      <td>{props.brand.id} </td>
      <td>{props.brand.brand_name} </td>
      <td>{props.brand.created_user} </td>
      <td>{props.brand.update_user} </td>
      <td>{props.brand.created_time} </td>
      <td>{props.brand.update_time} </td>
      <td><i onClick={onEdit} className="fa fa-edit fa-lg"></i><i onClick={handleOnClickDelete} className="fa fa-trash fa-lg"></i></td>
    </tr>
  );
}

export default Item;
© 2019 GitHub, Inc.