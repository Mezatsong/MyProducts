import { combineReducers } from "redux";
import filter from './filter';
import products from './products';
import username from './username';
import chunk from './chunk';
import hideNullQte from './hideNullQte';

export default combineReducers({
    filter, 
    products,
    username,
    chunk,
    hideNullQte,
});
