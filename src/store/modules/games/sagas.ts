import { AxiosResponse } from 'axios';
import { all, takeLatest,call ,put } from 'redux-saga/effects';
import api from '../../../server/api';
import { ActionTypes } from './types';
import { loadGamesFailure, loadGamesSuccess } from './action';
import { GamesProps } from './types';

function* checkLoadGames() { 
    // const token = localStorage.getItem('@TGL:token');
    // console.log(token);
    // const availableSGamesResponse: AxiosResponse<GamesProps> = yield call(api.get, "/games" );
    try {
        const availableSGamesResponse: AxiosResponse<GamesProps> = yield call(api.get, "/games", );
        yield put(loadGamesSuccess(availableSGamesResponse.data));
    }catch(err){
        yield put(loadGamesFailure(true));
    }
}

export default all([
    takeLatest(ActionTypes.loadGames, checkLoadGames),
])