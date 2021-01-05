import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { SET_AVAILABLE_EXERCISES, SET_COMPLETED_EXERCISES, START_EXERCISE, STOP_EXERCISE, TrainingActions } from './training.actions';
import * as fromRoot from 'src/app/app.reducer';

export interface ITrainingState {
    activeExercise?: Exercise;
    availableExercises?: Exercise[];
    completedExercises?: Exercise[];
}

export interface IApplicationState extends fromRoot.IApplicationState {
    training: ITrainingState;
}

const initialState: ITrainingState = {
    activeExercise: null,
    availableExercises: [],
    completedExercises: []
};

export function trainingReducer(state: ITrainingState = initialState, action: TrainingActions): ITrainingState {
    switch (action.type) {
        case SET_AVAILABLE_EXERCISES:
            return {
                ...state,
                availableExercises: action.payload
            };
        case SET_COMPLETED_EXERCISES:
            return {
                ...state,
                completedExercises: action.payload
            };
        case START_EXERCISE:
            return {
                ...state,
                activeExercise: { ...state.availableExercises.find(x => x.id === action.payload) }
            };
        case STOP_EXERCISE:
            return {
                ...state,
                activeExercise: null
            };
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<ITrainingState>('training');
export const getActiveExercise = createSelector(getTrainingState, (state: ITrainingState) => state.activeExercise);
export const getAvailableExercises = createSelector(getTrainingState, (state: ITrainingState) => state.availableExercises);
export const getCompletedExercises = createSelector(getTrainingState, (state: ITrainingState) => state.completedExercises);
export const getIsExercising = createSelector(getTrainingState, (state: ITrainingState) => state.activeExercise !== null);
