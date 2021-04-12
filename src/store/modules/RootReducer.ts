import { combineReducers } from "redux";
import games from './games/reducer';
import auth from './auth/reducer';


export default combineReducers({
    games,
    auth,
});