import * as AT from './actionTypes';
import StorageService from '../services/StorageService';

export const addProduct = product => (dispatch) => (
    StorageService.addProduct(product)
    .then(product =>
        dispatch({
            type: AT.ADD_PRODUCT,
            payload: {
                product
            }
        })
    )
)

export const updateProduct = product => (dispatch) => {
    dispatch({
        type: AT.UPDATE_PRODUCT,
        payload: {
            product
        }
    })
    StorageService.updateProduct(product).finally();
}

export const removeProduct = productId => (dispatch) => {
    dispatch({
        type: AT.REMOVE_PRODUCT,
        payload: {
            productId
        }
    })
    StorageService.removeProduct(productId).finally();
}

export const loadProducts = () => (dispatch) => (
    StorageService.getProducts()
    .then(products => 
        dispatch({
            type: AT.PRODUCTS_LOADED,
            payload: {products}
        })
    )
)


export const setFilter = (filter) => ({
    type: AT.SET_FILTER,
    payload: { 
        filter
    }
});

export const loadUsername = () => (dispatch) => (
    StorageService.getUsername()
    .then(username => {
        dispatch({
            type: AT.USERNAME_LOADED,
            payload: {
                username
            }
        })}
    )
);

export const changeUsername = (username) => (dispatch) => {
    dispatch({
        type: AT.USERNAME_LOADED,
        payload: {
            username
        }
    });
    StorageService.setUsername(username).finally()
}

export const loadChunk = () => (dispatch) => (
    StorageService.getChunk()
    .then(chunk => {
        dispatch({
            type: AT.CHUNK_LOADED,
            payload: {
                chunk
            }
        })}
    )
);

export const changeChunk = (chunk) => (dispatch) => (
    StorageService.setChunk(chunk)
    .then(chunk => 
         dispatch({
             type: AT.CHUNK_LOADED,
             payload: {
                 chunk
             }
         })
    )
)

export const loadHideNullQte = () => (dispatch) => (
    StorageService.getHideNullQte()
    .then(hideNullQte =>
        dispatch({
            type: AT.HIDE_NULL_QTE_LOADED,
            payload: {
                hideNullQte
            }
        })
    )
)

export const changeHideNullQte = (hideNullQte) => (dispatch) => (
    StorageService.setHideNullQte(hideNullQte)
    .then(hideNullQte =>
        dispatch({
            type: AT.HIDE_NULL_QTE_LOADED,
            payload: {
                hideNullQte
            }
        })
    )
)
