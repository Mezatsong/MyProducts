import { USERNAME_LOADED } from "../actionTypes";

const initialState = 'Loading...';


export default (state = initialState, action) => {
    if (action.type == USERNAME_LOADED) {
        return `${action.payload.username}`;
    }
    return state;
}