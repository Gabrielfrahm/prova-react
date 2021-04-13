import { AxiosResponse } from 'axios';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../server/api';
import { ActionTypes } from './types';
import { loadGames } from './action';
import { GamesProps } from './types';


type checkLoadGamesRequest = ReturnType<typeof loadGames>;

function* checkLoadGames({payload}: checkLoadGamesRequest) {
    const {games} = payload;

    const availableSGamesResponse: AxiosResponse<GamesProps> = yield call(api.get, '/types');

    if(availableSGamesResponse.data ){
        yield put(loadGames(games));
     }else {
        console.log('error ao carrega jogos');
     }
}

export default all([
    takeLatest(ActionTypes.loadGames, checkLoadGames),
])