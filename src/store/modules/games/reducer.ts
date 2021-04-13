import { Reducer } from "redux";
import { GamesState } from "./types";
import producer from 'immer';
import { ActionTypes } from "./types";
const INITIAL_STATE: GamesState = {
    games: []
}

const gamesModules: Reducer<GamesState> = (state = INITIAL_STATE, action) => {
    return producer(state, draft =>{
        switch (action.type) {
            case ActionTypes.loadGames: {
                const { games } = action.payload;
                console.log(games);
                break;
            }
            default:
                return INITIAL_STATE;
        }
    })
}


export default gamesModules;