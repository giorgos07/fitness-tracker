import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from 'src/app/shared/ui.reducer';
import * as fromAuth from 'src/app/auth/auth.reducer';

export interface IApplicationState {
    ui: fromUi.IUiState;
    auth: fromAuth.IAuthState;
}

export const reducers: ActionReducerMap<IApplicationState, Action> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.IUiState>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
export const getAuthState = createFeatureSelector<fromAuth.IAuthState>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
