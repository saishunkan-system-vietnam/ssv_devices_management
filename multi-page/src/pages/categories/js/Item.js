import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

function Item(p) {
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

  function set_Edit() {
    p.set_Edit(p.id);
  }

  function set_View() {
    p.set_View(p.id);
  }

  return (
    <tr>
      <td className="text-center">{p.id}</td>
      <td>{p.name}</td>
      <td>{p.brands_id}</td>
      <td>{p.parent_id}</td>
      <td>
        <i className="fa fa-eye fa-lg" onClick={set_View}></i>
        <i className="fa fa-edit fa-lg" onClick={set_Edit}></i>
        <i className="fa fa-trash fa-lg" onClick={handleDelete}></i>
      </td>
    </tr>
  );
}

export default Item;
