import * as Types from '../constants';
import { findIndex } from '../../../common/findIndex';
var initialState = [

];

const brands = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case Types.FETCH_BRANDS:
            return [...state, { data: action.brands }];
        case Types.DELETE_BRANDS:
            {
                let { result } = action;
                if (result.status === 200) {
                    index = findIndex(state, action.id);
                    state.data.splice(index, 1);
                }                
                return [...state, { status: result.status, message: result.message }];
            }

        default: return state;
    }
}

export default brands;