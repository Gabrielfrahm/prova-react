import {all, put, select, takeLatest} from 'redux-saga/effects';
import { signInRequest, signInFailure, signInSuccess } from './action';
import { ActionTypes, UserState } from './types';


type checkUserRequest = ReturnType<typeof signInRequest>;

function* checkUser({payload}: checkUserRequest){
    const {user} = payload;

    const check: UserState = yield select((state: UserState) => {
        return state.users.find(u =>  u.email  === user.email && u.password === user.password)
    });

    if(check){
        yield put(signInSuccess(user))
    }else {
        yield put(signInFailure('erro ao fazer login, check suas credenciais'));
    }
}

export default all([
    takeLatest(ActionTypes.signIn, checkUser),
]) 