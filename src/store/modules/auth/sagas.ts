import {all, put, select, takeLatest} from 'redux-saga/effects';
import { IState } from '../..';
import { signInRequest, signInFailure, signInSuccess } from './action';
import { ActionTypes } from './types';


type checkUserRequest = ReturnType<typeof signInRequest>;

function* checkUser({payload}: checkUserRequest){
    const {user} = payload;

    const check: boolean = yield select((state: IState) => {
        return state.auth.users.find(us => us.email === user.email && us.password === user.password);
    });

    if(check !== undefined){
        yield put(signInSuccess(user))
    }else {
        yield put(signInFailure('erro ao fazer login, check suas credenciais'));
    }
}

export default all([
    takeLatest(ActionTypes.signInRequest, checkUser),
]) 