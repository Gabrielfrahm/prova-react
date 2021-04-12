import {all} from 'redux-saga/effects';
import auth from './auth/reducer';

import games from './games/sagas';


export default function* rootSaga() {
    yield all([
        games,
        auth
    ])
}