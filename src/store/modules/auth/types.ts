export enum ActionTypes {
    signUpRequest = 'SIGN_UP',
    signUpSuccess = 'SIGN_UP_SUCCESS',
    signUpFailure = 'SIGN_UP_FAILURE',
    signInRequest = 'SIGN_IN',
    signInSuccess = 'SIGN_IN_SUCCESS',
    signInFailure = 'SIGN_IN_FAILURE',
}

export interface User {
    name: string;
    email: string;
    password: string;
}


export interface Auth {
    email: string;
    password: string;
} 

export interface UserState {
    users: User[];
    auth: Auth;
    erro: string;
}
