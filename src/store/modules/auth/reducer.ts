import produce from 'immer';
import { Reducer } from 'redux'
import { ActionTypes, UserState } from './types';

const INICIAL_STATE: UserState = {
    users: [],
    auth: {
        email: '',
        password: '',
    },
    erro: '',
}

const auth: Reducer<UserState> = (state = INICIAL_STATE, action) => {

    return produce(state, draft => {
        switch (action.type) {
            case ActionTypes.signUpSuccess: {
                const { user } = action.payload;
                
                draft.users.push(user);
                draft.erro = '';

                break;
            }
            case ActionTypes.signUpFailure: {
                const { error } = action.payload;
                draft.erro = error;
                break;
            }
            case ActionTypes.signInSuccess: {
                const { user } = action.payload;
                const checkUSer = draft.users.find(u => (
                    u.email === user.email && u.password === user.password
                ));

                if (checkUSer) {
                    draft.auth.email = user.email;
                    draft.auth.password = user.password;
                    draft.erro = '';
                    localStorage.setItem('@user', JSON.stringify(user))
                }
                break;
            }
            case ActionTypes.signInFailure: {
                const { error } = action.payload;
                draft.erro = error;
                break;
            }
            default:
                return draft;
        }
    })
}

export default auth;