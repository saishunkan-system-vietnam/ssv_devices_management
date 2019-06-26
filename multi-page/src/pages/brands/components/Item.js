import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import { toShortDate } from '../../../common/date';
import {
  actionDeleteBrandsRequest,
  actionRemoveStatus,
  actionViewBrandRequest,
  actionToggleForm
} from '../actions/index';

const Item = props => {

  var alert = useAlert();

  const handleEditBrand = brand_id => {
    props.viewBrand(brand_id);
  }

  useEffect(() => {
    if (props.brands.status && props.brands.message) {
      if (props.brands.status === 200) {
        alert.success(props.brands.message);
      } else {
        alert.error(props.brands.message);
      }
      props.removeStatus();
    }
  }, [props.brands.status])

  const handleDeleteBrand = brand_id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Bạn đang xóa Thương hiệu?</h1>
            <button onClick={() => {
              props.deleteBrand(brand_id);
              onClose();
            }}>Xóa</button>
            <button onClick={onClose}>Hủy</button>
          </div>
        )
      }
    })
  }

  return (
    <tr>
      <td className="text-center">{props.brand.id} </td>
      <td>{props.brand.brand_name} </td>
      <td>{props.brand.created_user} </td>
      <td>{props.brand.update_user} </td>
      <td>{toShortDate(props.brand.created_time)} </td>
      <td>{toShortDate(props.brand.update_time)} </td>
      <td>
        <i onClick={() => handleEditBrand(props.brand.id)} className="fa fa-edit fa-lg"></i>
        <i onClick={() => handleDeleteBrand(props.brand.id)} className="fa fa-trash fa-lg"></i></td>
    </tr>
  );
}

const mapStateToProps = state => {
  return {
    brands: state.brands
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteBrand: brand_id => {
      dispatch(actionDeleteBrandsRequest(brand_id))
    },

    removeStatus: () => {
      dispatch(actionRemoveStatus());
    },

    toggleForm: () => {
      dispatch(actionToggleForm());
    },

    viewBrand: brand_id => {
      dispatch(actionViewBrandRequest(brand_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
