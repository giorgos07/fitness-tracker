import { Action } from '@ngrx/store';

export const START_LOADING = '[Ui] Start Loading';
export const STOP_LOADING = '[Ui] Stop Loading';

export class StartLoading implements Action {
    public readonly type = START_LOADING;
}

export class StopLoading implements Action {
    public readonly type = STOP_LOADING;
}

export type UiActions = StartLoading | StopLoading;
