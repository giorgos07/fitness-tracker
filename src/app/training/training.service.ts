import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { UiService } from 'src/app/shared/ui.service';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import * as Ui from 'src/app/shared/ui.actions';

@Injectable()
export class TrainingService {
    private fetchAvailableExercisesSubscription: Subscription;
    private fetchCompletedExercisesSubscription: Subscription;

    constructor(
        private firestore: AngularFirestore,
        private uiService: UiService,
        private store: Store<fromTraining.IApplicationState>) { }

    public fetchAvailableExercises(): void {
        this.store.dispatch(new Ui.StartLoading());
        this.fetchAvailableExercisesSubscription = this.firestore
            .collection<Exercise>('available-exercises')
            .valueChanges({ idField: 'id' })
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Ui.StopLoading());
                this.store.dispatch(new Training.SetAvailableExercises(exercises));
            }, _ => {
                this.store.dispatch(new Ui.StopLoading());
                this.uiService.showSnackBar('An error occured while fetching available exercises. Please try again.');
            });
    }

    public fetchCompletedExercises(): void {
        this.store.dispatch(new Ui.StartLoading());
        this.fetchCompletedExercisesSubscription = this.firestore
            .collection<Exercise>('completed-exercises')
            .valueChanges({ idField: 'id' })
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Ui.StopLoading());
                this.store.dispatch(new Training.SetCompletedExercises(exercises));
            }, _ => {
                this.store.dispatch(new Ui.StopLoading());
                this.uiService.showSnackBar('An error occured while fetching completed exercises. Please try again.');
            });
    }

    public startExercise(exerciseId: string): void {
        this.store.dispatch(new Training.StartExercise(exerciseId));
    }

    public completeExercise(): void {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe((exercise: Exercise) => {
            if (exercise) {
                this.persistExercise({
                    ...exercise,
                    date: new Date(),
                    state: 'completed'
                });
            }
            this.store.dispatch(new Training.StopExercise());
        });
    }

    public cancelExercise(progress: number): void {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe((exercise: Exercise) => {
            if (exercise) {
                this.persistExercise({
                    ...exercise,
                    date: new Date(),
                    state: 'cancelled',
                    duration: exercise.duration * (progress / 100),
                    calories: exercise.calories * (progress / 100)
                });
            }
            this.store.dispatch(new Training.StopExercise());
        });
    }

    public clearSubscriptions(): void {
        this.fetchAvailableExercisesSubscription?.unsubscribe();
        this.fetchCompletedExercisesSubscription?.unsubscribe();
    }

    private persistExercise(exercise: Exercise): void {
        this.firestore
            .collection('completed-exercises')
            .add(exercise)
            .catch(_ => {
                this.uiService.showSnackBar('An error occured while saving exercises. Please try again.');
            });
    }
}
