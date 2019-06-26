import * as Types from '../constants';
import { findIndex } from '../../../common/findIndex';
var initialState = {
    data: [],
    message: null,
    status: null
};

const brands = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_BRANDS:
            state.data = action.brands;
            return { ...state};
        case Types.DELETE_BRANDS:
            let { result } = action;
            if (result.status === 200) {
                state.data = state.data.filter(x => x.id !== result.id);
            }
            state.message = "a";
            state.status = true;
            return { ...state,state};
        default: return state;
    }
}

export default brands;