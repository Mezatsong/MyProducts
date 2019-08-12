import { CHUNK_LOADED } from "../actionTypes";

const initialState = 1;


export default (state = initialState, action) => {
    if (action.type == CHUNK_LOADED) {
        return +action.payload.chunk;
    }
    return state;
}