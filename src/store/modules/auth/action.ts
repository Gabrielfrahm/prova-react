import {ActionTypes, Auth, User} from './types';

export function signUpRequest(user: User){
    return {
        type: ActionTypes.signUpRequest,
        payload: {
            user,
        }
    }
}

export function signUpSuccess(user: User){
    return {
        type: ActionTypes.signUpSuccess,
        payload: {
            user,
        }
    }
}

export function signUpFailure(error: string){
    return {
        type: ActionTypes.signUpFailure,
        payload: {
            error,
        }
    }
}

export function signInRequest(user: Auth){
    return {
        type: ActionTypes.signInRequest,
        payload: {
            user,
        }
    }
}


export function signInSuccess(user: Auth){
    return {
        type: ActionTypes.signInSuccess,
        payload: {
            user,
        }
    }
}

export function signInFailure(error: string){
    return {
        type: ActionTypes.signInFailure,
        payload: {
            error,
        }
    }
}