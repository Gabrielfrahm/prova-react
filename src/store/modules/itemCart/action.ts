import { ActionTypes, Item } from './type';

export function addProductToCartRequest(item: Item) {
    return {
        type: ActionTypes.addProductToCartRequest,
        payload: {
            item,
        }
    };
}

export function addProductToCartSuccess(item: Item) {
    return {
        type: ActionTypes.addProductToCartSuccess,
        payload: {
            item,
        }
    }
};


export function addProductToCartFailure(error: string){
    return {
        type: ActionTypes.addProductToCartFailure,
        payload: {
            error,
        }
    };
}

export function removeProductToCart(item: Item){
    return {
        type: ActionTypes.removeProductToCart,
        payload: {
            item,
        }
    };
}