import { Action } from '@ngrx/store';

import { Exercise } from './exercise.model';

export const SET_AVAILABLE_EXERCISES = '[Training] Set Available Exercises';
export const SET_COMPLETED_EXERCISES = '[Training] Set Completed Exercises';
export const START_EXERCISE = '[Training] Start Exercise';
export const STOP_EXERCISE = '[Training] Stop Exercise';

export class SetAvailableExercises implements Action {
    public readonly type = SET_AVAILABLE_EXERCISES;

    constructor(public payload: Exercise[]) { }
}

export class SetCompletedExercises implements Action {
    public readonly type = SET_COMPLETED_EXERCISES;

    constructor(public payload: Exercise[]) { }
}

export class StartExercise implements Action {
    public readonly type = START_EXERCISE;

    constructor(public payload: string) { }
}

export class StopExercise implements Action {
    public readonly type = STOP_EXERCISE;
}

export type TrainingActions = SetAvailableExercises | SetCompletedExercises | StartExercise | StopExercise;
