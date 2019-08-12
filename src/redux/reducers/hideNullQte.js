import { HIDE_NULL_QTE_LOADED } from "../actionTypes";

const initialState = false;


export default (state = initialState, action) => {
    if (action.type == HIDE_NULL_QTE_LOADED) {
        return action.payload.hideNullQte;
    }
    return state;
}