import React from 'react';

function Item(p) {
  let urlEdit=`/categories/edit/${p.id}`;
  return (   
    <tr>
        <td>{p.id}</td>
        <td>{p.brands_id}</td>
        <td>{p.parent_id}</td>
        <td>{p.name}</td>
        <td>{p.created_user}</td>
        <td>{p.update_user}</td>
        <td>{p.created_time}</td>
        <td>{p.update_time}</td>    						
        <td><i className="fa fa-eye fa-lg"></i><a href={urlEdit}><i className="fa fa-edit fa-lg"></i></a><i className="fa fa-trash fa-lg"></i></td>                            
    </tr>
  );
}

export default Item;
