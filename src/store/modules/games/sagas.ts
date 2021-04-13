import { AxiosResponse } from 'axios';
import { all, takeLatest,call ,put } from 'redux-saga/effects';
import api from '../../../server/api';
import { ActionTypes } from './types';
import { loadGames, loadGamesSuccess } from './action';
import { GamesProps } from './types';


type checkLoadGamesRequest = ReturnType<typeof loadGames>;

function* checkLoadGames({payload}: checkLoadGamesRequest) { 
    const { bet } = payload; 
    const availableSGamesResponse: AxiosResponse<GamesProps> = yield call(api.get, "/types");
    if(availableSGamesResponse.data){
        yield put(loadGamesSuccess(bet));
    }else{
        console.log('error')
    }
}


export default all([
    takeLatest(ActionTypes.loadGames, checkLoadGames),
])