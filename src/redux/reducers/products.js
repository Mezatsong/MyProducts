import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    REMOVE_PRODUCT,
    PRODUCTS_LOADED
} from "../actionTypes";

const initialState = null;


const add = (state, action) => {
    const { product } = action.payload;
    if(state)
        return [...state, product]
    return [product];
}

const update = (state, action) => {
    const { product } = action.payload;
    return state.map(p => p.id != product.id ? p : product);
}

const remove = (state, action) => {
    const { productId } = action.payload;
    return state.filter(p => p.id != productId)
}

const load = (state, action) => {
    const { products } = action.payload;
    return products;
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT: return add(state, action);
        case UPDATE_PRODUCT: return update(state, action);
        case REMOVE_PRODUCT: return remove(state, action);
        case PRODUCTS_LOADED: return load(state, action);
        default:
            return state;
    }
}
