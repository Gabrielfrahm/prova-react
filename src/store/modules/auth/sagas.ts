import {all, put, select, takeLatest} from 'redux-saga/effects';
import { IState } from '../..';
import { signInRequest, signInFailure, signInSuccess, signUpRequest, signUpSuccess, signUpFailure } from './action';
import { ActionTypes } from './types';


type checkUserRequest = ReturnType<typeof signInRequest>;
type checkUserSignUpRequest = ReturnType<typeof signUpRequest>;

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


function* checkUserSignUp({payload}: checkUserSignUpRequest){
    const {user} = payload;

    const check: boolean = yield select((state: IState) => {
        return state.auth.users.find(us => us.email === user.email);
    });

    if(check === undefined){
        yield put(signUpSuccess(user))
    }else {
        yield put(signUpFailure('erro ao tentar cadastrar, esse email ja esta sendo utilizado'));
    }
}


export default all([
    takeLatest(ActionTypes.signInRequest, checkUser),
    takeLatest(ActionTypes.signUpRequest, checkUserSignUp),
]) 