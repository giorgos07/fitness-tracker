import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Exercise } from 'src/app/training/exercise.model';
import { TrainingService } from 'src/app/training/training.service';
import * as fromRoot from 'src/app/app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.IApplicationState>) { }

  public exercises$: Observable<Exercise[]>;
  public isLoading$: Observable<boolean>;

  public ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.trainingService.fetchAvailableExercises();
  }

  public onTrainingStarted(form: NgForm): void {
    this.trainingService.startExercise(form.value.exerciseId);
  }

  public ngOnDestroy(): void {
    this.trainingService.clearSubscriptions();
  }
}
