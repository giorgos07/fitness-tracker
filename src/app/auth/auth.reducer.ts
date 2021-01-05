import { Action } from '@ngrx/store';

import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface IAuthState {
    isAuthenticated: boolean;
}

const initialState: IAuthState = {
    isAuthenticated: false
};

export function authReducer(state: IAuthState = initialState, action: Action): IAuthState {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export const getIsAuthenticated = (state: IAuthState) => state.isAuthenticated;
