import {ActionTypes, GamesProps} from './types';

export function loadGames(bet : GamesProps){
    return {
        type: ActionTypes.loadGames,
        payload: {
            bet,
        }
    };
}

export function loadGamesSuccess(bet : GamesProps ){
    return {
        type: ActionTypes.loadGamesSuccess,
        payload: {
            bet,
        }
    };
}