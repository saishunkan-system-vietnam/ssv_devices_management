import * as Types from '../_constants/ActionTypes';
import BrandList from '../api/Brand/brandsList';
import BrandDelete from '../api/Brand/brandDelete';

export const actionFetchBrandsRequest = () => {
    return (dispatch) => {
        return BrandList.BrandList().then(res => {
            dispatch(actionFetchBrands(res.payload.lstBrands))
        })
    }
}

export const actionFetchBrands = (brands) => {
    return {
        type: Types.FETCH_BRANDS,
        brands
    }
}

export const actionDeleteBrandsRequest = (id) => {
    let frm = new FormData();
    frm.append("id", id);
    return dispatch => {
        return BrandDelete.BrandDelete(frm).then(res => {
            let _id = null;
            if (res['0'] === 200) {
                _id = id;
            }
            dispatch(actionDeleteBrands(_id));
        })
    }
}

export const actionDeleteBrands = (id) => {
    return {
        type: Types.DELETE_BRANDS,
        id
    }
}