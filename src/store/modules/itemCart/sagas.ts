import {all ,takeLatest, put} from 'redux-saga/effects';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './action';
import { ActionTypes } from './type';

type checkItemRequest = ReturnType<typeof addProductToCartRequest>;

function* checkItemCart({payload}: checkItemRequest) {
    const {item} = payload;
  
    if(item.numbers){
        yield put(addProductToCartSuccess(item));
    }else {
        yield put(addProductToCartFailure('Erro ao tentar adicionar no carrinho'));
    }
}

export default all([
    takeLatest(ActionTypes.addProductToCartRequest, checkItemCart)
])