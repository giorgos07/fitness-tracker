import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromTraining.ITrainingState>) { }

  public isExercising$: Observable<boolean>;

  public ngOnInit(): void {
    this.isExercising$ = this.store.select(fromTraining.getIsExercising);
  }

  public ngOnDestroy(): void { }
}
