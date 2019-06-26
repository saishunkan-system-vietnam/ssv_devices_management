import * as Types from '../constants';
import { findIndex } from '../../../common/findIndex';
var initialState = [];

const brands = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_BRANDS:
            state = action.brands;
            return state;
        case Types.DELETE_BRANDS:
            let { result } = action;
            if (result.status === 200) {
                state = state.filter(x => x.id !== result.id);
            }
            return state;
        default: return state;
    }
}

export default brands;