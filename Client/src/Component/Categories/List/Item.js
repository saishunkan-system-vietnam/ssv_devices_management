import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

function Item(p) {
  let urlEdit = `/categories/edit/${p.id}`;
  let urlView = `/categories/view/${p.id}`;

  function handleDelete() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Bạn đang xóa Danh mục?</h1>
            <button onClick={() => {
              p.onDelete(p.id);
              onClose();
            }
            }>Xóa</button>
            <button onClick={onClose}>Hủy</button>
          </div>
        )
      }
    })
  }

  return (
    <tr>
      <td className="text-center">{p.id}</td>
      <td>{p.brands_id}</td>
      <td>{p.parent_id}</td>
      <td>{p.name}</td>
      <td>
        <Link to={urlView}><i className="fa fa-eye fa-lg"></i></Link>
        <Link to={urlEdit}><i className="fa fa-edit fa-lg"></i></Link>
        <i className="fa fa-trash fa-lg" onClick={handleDelete}></i>
      </td>
    </tr>
  );
}

export default Item;
