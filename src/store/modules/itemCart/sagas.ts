import { all, takeLatest, put } from 'redux-saga/effects';
import { addGamesFailure, addGamesRequest, addGamesSuccess, addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './action';
import { ActionTypes } from './type';

type checkItemRequest = ReturnType<typeof addProductToCartRequest>;
type checkBetRequest = ReturnType<typeof addGamesRequest>;

function* checkItemCart({ payload }: checkItemRequest) {
    const { item } = payload;

    if (item.numbers) {
        yield put(addProductToCartSuccess(item));
    } else {
        yield put(addProductToCartFailure('Erro ao tentar adicionar no carrinho'));
    }
}

function* checkBetCart({ payload }: checkBetRequest) {
    const { item } = payload;
    try {
        if (item) {
            yield put(addGamesSuccess(item))
        }
    } catch (err) {
        yield put(addGamesFailure('error ao tentar inserir a compra'))
    }
}

export default all([
    takeLatest(ActionTypes.addProductToCartRequest, checkItemCart),
    takeLatest(ActionTypes.addGamesRequest, checkBetCart)
])