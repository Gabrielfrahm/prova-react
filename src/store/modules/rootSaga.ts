import {all} from 'redux-saga/effects';
import auth from './auth/sagas';
import games from './games/sagas';
import itemCart from './itemCart/sagas';

export default function* rootSaga() {
    yield all([
        auth,
        games,
        itemCart
    ])
}