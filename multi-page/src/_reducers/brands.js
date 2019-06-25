import * as Types from '../_constants/ActionTypes';
import { findIndex } from '../common/findIndex';
var initialState = [];

const brands = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case Types.FETCH_BRANDS:
            state = action.brands;
            return [state];
        case Types.DELETE_BRANDS:
            if (action.id) {
                index = findIndex(state, action.id);
                state.splice(index, 1);
            }
            return [...state];
        default: return [...state];
    }
}

export default brands;