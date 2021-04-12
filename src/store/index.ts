import {applyMiddleware, createStore} from 'redux';
import { GamesState } from './modules/games/types';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './modules/RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './modules/rootSaga';
import { UserState } from './modules/auth/types';

export interface IState {
    games: GamesState;
    auth: UserState;
}

const sagaMiddleware = createSagaMiddleware();

const middleware= [sagaMiddleware];

const store = createStore(
    RootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware),
    )
)

sagaMiddleware.run(rootSaga);

export default store;