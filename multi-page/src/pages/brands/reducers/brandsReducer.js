import * as Types from '../constants';
var initialState = {
    data: [],
    brand: null,
    message: null,
    status: null,
    toggle_form: false
};

const brands = (state = initialState, action) => {
    switch (action.type) {

        case Types.FETCH_BRANDS:
            state.data = action.brands;
            return { ...state };

        case Types.DELETE_BRANDS:
            let { result } = action;
            if (result.status === 200) {
                state.data = state.data.filter(x => x.id !== result.id);
            }
            state.message = result.message;
            state.status = result.status;
            return { ...state, state };

        case Types.REMOVE_STATUS:
            state.message = null;
            state.status = null;
            return { ...state, state }

        case Types.TOGGLE_FORM:
            state.toggle_form = !state.toggle_form;
            return { ...state, state }

        case Types.FILTER_BRANDS:
            state.data = action.result
            return { ...state, state }
        
        case Types.VIEW_BRANDS:
            state.brand = action.result.brand;
            state.status = action.result.status;
            return {...state, state}

        default: return { ...state };
    }
}

export default brands;