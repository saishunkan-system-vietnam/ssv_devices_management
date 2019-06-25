import * as Types from '../constants';
import BrandList from '../../../api/Brand/brandsList';
import BrandDelete from '../../../api/Brand/brandDelete';

export const actionFetchBrandsRequest = () => {
    return (dispatch) => {
        return BrandList.BrandList().then(res => {
            dispatch(actionFetchBrands(res.payload.lstBrands));
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
            dispatch(actionDeleteBrands({ id, status: res['0'], message: res.payload.message }));
        })
    }
}

export const actionDeleteBrands = (result) => {
    return {
        type: Types.DELETE_BRANDS,
        result
    }
}