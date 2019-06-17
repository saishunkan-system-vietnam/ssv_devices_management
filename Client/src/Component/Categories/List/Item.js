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
            <button onClick={() => {
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
    <tbody>
      <tr>
        <td>{p.id}</td>
        <td>{p.brands_id}</td>
        <td>{p.parent_id}</td>
        <td>{p.name}</td>
        <td>
          <a href={urlView}><i className="fa fa-eye fa-lg"></i></a>
          <a href={urlEdit}><i className="fa fa-edit fa-lg"></i></a>
          <i className="fa fa-trash fa-lg" onClick={handleDelete}></i>
        </td>
      </tr>
    </tbody>
  );
}

export default Item;
