import {GamesProps} from './types';

export function loadGames(games: GamesProps){
    return {
        type: 'LOADING_GAMES',
        payload: {
            games,
        }
    };
}