import {ActionTypes, GamesProps} from './types';

export function loadGames(games: GamesProps){
    return {
        type: ActionTypes.loadGames,
        payload: {
            games,
        }
    };
}