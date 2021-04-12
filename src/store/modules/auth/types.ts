export enum ActionTypes {
    signUp = 'SIGN_UP',
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
