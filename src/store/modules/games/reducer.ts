import { Reducer } from "redux";
import { GamesState } from "./types";
import producer from 'immer';
const INITIAL_STATE: GamesState = {
    games: []
}

const gamesModules: Reducer<GamesState> = (state = INITIAL_STATE, action) => {
    return producer(state, draft =>{
        switch (action.type) {
            case 'LOADING_GAMES': {
                const { games } = action.payload;
    
                draft.games.push(games);
                break;
            }
            default:
                return INITIAL_STATE;
        }
    })
}


export default gamesModules;