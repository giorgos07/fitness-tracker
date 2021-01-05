import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { combineLatest, Observable, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { CompleteTrainingComponent } from './complete-training.component';
import { Exercise } from '../exercise.model';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  private timer: Observable<number> = timer(1000, 1000);
  private currentTimerValue = 0;
  private lastSavedTimerValue = 0;
  private timerSubscription: Subscription;
  private dialogRefSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.IApplicationState>) { }

  public progress = 0;
  public pausedTraining = false;

  public ngOnInit(): void {
    this.startTimer();
  }

  public stopTraining(): void {
    this.lastSavedTimerValue += this.currentTimerValue;
    this.pausedTraining = true;
    this.stopTimer();
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      },
      disableClose: true
    });
    this.dialogRefSubscription = dialogRef.afterClosed().subscribe((quit: boolean) => {
      if (quit) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.pausedTraining = false;
        this.startTimer();
      }
    });
  }

  public ngOnDestroy(): void {
    this.stopTimer();
    this.dialogRefSubscription?.unsubscribe();
  }

  private startTimer(): void {
    this.timerSubscription = combineLatest([
      this.store.select(fromTraining.getActiveExercise).pipe(take(1)),
      this.timer
    ]).subscribe((result: Array<Exercise | number>) => {
      const exercise = result[0] as Exercise;
      const step = Math.round(100 / exercise.duration);
      this.currentTimerValue = +result[1];
      const progress = (this.currentTimerValue + this.lastSavedTimerValue + 1) * step;
      this.progress = progress >= 100 ? 100 : progress;
      if (this.progress === 100) {
        this.stopTimer();
        const dialogRef = this.dialog.open(CompleteTrainingComponent, {
          data: {
            progress: this.progress
          },
          disableClose: true
        });
        this.dialogRefSubscription = dialogRef.afterClosed().subscribe(_ => {
          this.trainingService.completeExercise();
        });
      }
    });
  }

  private stopTimer(): void {
    this.timerSubscription?.unsubscribe();
  }
}
