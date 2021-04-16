import { Reducer } from "redux";
import producer from 'immer';
import { ActionTypes, CartIState  } from "./type";


const INITIAL_STATE: CartIState = {
    items: [],
    error: '',
    price : 0,
}

const cart: Reducer<CartIState> = (state = INITIAL_STATE, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case ActionTypes.addProductToCartSuccess: {
                const { item } = action.payload;
                const checkNumbers = draft.items.find(i => {
                    return i.numbers === item.numbers && i.type === item.type
                })
                if(!checkNumbers){
                    draft.items.push(item);
                    draft.price = (draft.price + item.price);
                    draft.error= '';
                }else {
                    draft.error = 'voce ja tem esse jogo no carrinho'
                }
                break;
            }
            case ActionTypes.addProductToCartFailure: {
                const {error} = action.payload;
                draft.error = error;
                break;
            }
            case ActionTypes.removeProductToCart: {
                const {item} = action.payload;
                const findItem = draft.items.findIndex(i => {
                    return i.numbers === item.numbers && i.type === item.type
                });
                console.log(findItem);
                draft.items.splice(findItem, 1 );
                draft.price = (draft.price - item.price);
                break;
            }
            default: {
                return draft;
            }
        }
    });
}
export default cart;