import * as Types from '../constants';
import BrandList from '../../../api/Brand/brandsList';
import BrandDelete from '../../../api/Brand/brandDelete';
import BrandFilter from '../../../api/Brand/brandFilter';
import BrandView from '../../../api/Brand/brandsView';

export const actionFetchBrandsRequest = () => {
    return dispatch => {
        return BrandList.BrandList().then(res => {
            dispatch(actionFetchBrands(res.payload.lstBrands));
        })
    }
}

export const actionFetchBrands = brands => {
    return {
        type: Types.FETCH_BRANDS,
        brands
    }
}

export const actionDeleteBrandsRequest = id => {
    let frm = new FormData();
    frm.append("id", id);
    return dispatch => {
        return BrandDelete.BrandDelete(frm).then(res => {
            dispatch(actionDeleteBrands({ id, status: res['0'], message: res.payload.message }));
        })
    }
}

export const actionDeleteBrands = result => {
    return {
        type: Types.DELETE_BRANDS,
        result
    }
}

export const actionRemoveStatus = () => {
    return {
        type: Types.REMOVE_STATUS
    }
}

export const actionToggleForm = () => {
    return {
        type: Types.TOGGLE_FORM
    }
}

export const actionFilterBrandsRequest = brand_name => {
    let frm = new FormData();
    frm.append('brand_name', brand_name);
    return dispatch => {
        return BrandFilter.BrandsEdit(frm).then(res => {
            dispatch(actionFilterBrands(res.payload.lstBrands));
        })
    }
}

export const actionFilterBrands = result => {
    return {
        type: Types.FILTER_BRANDS,
        result
    }
}

export const actionViewBrandRequest = brand_id => {
    return dispatch => {
        return BrandView.BrandsView(brand_id).then(res => {
            dispatch(actionViewBrand({ status: res['0'], brand: res.payload.brand }));
        });
    }
}

export const actionViewBrand = result => {
    return {
        type: Types.VIEW_BRANDS,
        result
    }
}
