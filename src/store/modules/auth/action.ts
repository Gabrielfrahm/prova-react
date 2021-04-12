import {ActionTypes, Auth, User} from './types';

export function signUpAuth(user: User){
    return {
        type: ActionTypes.signUp,
        payload: {
            user,
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