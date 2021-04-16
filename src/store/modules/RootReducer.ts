import { combineReducers } from "redux";
import games from './games/reducer';
import auth from './auth/reducer';
import itemCart from './itemCart/reducer';


export default combineReducers({
    games,
    auth,
    itemCart
});