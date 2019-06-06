import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 

function Item(p) {
  let urlEdit = `/categories/edit/${p.id}`;
  let urlView = `/categories/view/${p.id}`;

  function handleDelete() {
    confirmAlert({
        customUI: ({ onClose }) => {           
            return (
                <div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this category?</p>
                    <button onClick={()=>{
                      p.onDelete(p.id);
                      onClose();
                    }    
                    }>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            )
        }
    })
}

  return (
    <tr>
      <td>12 </td>
      <td>12 </td>
      <td>12 </td>
      <td>12 </td>
      <td>13 </td>
      <td>13 </td>
      <td>13 </td>
      <td><i className="fa fa-eye fa-lg"></i><i className="fa fa-edit fa-lg"></i><i className="fa fa-trash fa-lg"></i></td>
    </tr>
  );
}

export default Item;
