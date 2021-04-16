export enum ActionTypes {
    addProductToCartRequest = 'ADD_PRODUCT_TO_CART_REQUEST',
    addProductToCartSuccess = 'ADD_PRODUCT_TO_CART_SUCCESS',
    addProductToCartFailure = 'ADD_PRODUCT_TO_CART_FAILURE',
    removeProductToCart = 'REMOVE_PRODUCT_TO_CART',
}

export interface Item {
    color: string;
    type: string;
    price: number;
    numbers: string;
}

export interface CartIState {
    items: Item[];
    error: string; 
    price: number;
}