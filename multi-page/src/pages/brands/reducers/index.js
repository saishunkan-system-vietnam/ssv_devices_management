import { combineReducers } from 'redux';
import brands from './brandsReducer';

const appReducers = combineReducers({
    brands
});
export default appReducers;