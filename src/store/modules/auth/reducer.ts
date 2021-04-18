import produce from 'immer';
import { Reducer } from 'redux'
import { ActionTypes, UserState } from './types';

const INICIAL_STATE: UserState = {
    users: [],
    auth: {
        email: '',
        password: '',
    },
    erro_singUp: '',
    erro_singIn: '',
}

const auth: Reducer<UserState> = (state = INICIAL_STATE, action) => {

    return produce(state, draft => {
        switch (action.type) {
            case ActionTypes.signUpSuccess: {
                const { user } = action.payload;
                
                draft.users.push(user);
                draft.erro_singUp = '';
                draft.erro_singIn = '';

                break;
            }
            case ActionTypes.signUpFailure: {
                const { error } = action.payload;
                draft.erro_singUp = error;
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
                    localStorage.setItem('@user', JSON.stringify(user))
                }
                draft.erro_singIn = '';
                draft.erro_singUp = '';
                break;
            }
            case ActionTypes.signInFailure: {
                const { error } = action.payload;
                draft.erro_singIn = error;
                break;
            }
            default:
                return draft;
        }
    })
}

export default auth;