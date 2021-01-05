import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) private matSort: MatSort;
  @ViewChild(MatPaginator) private matPaginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.IApplicationState>) { }

  public dataSource = new MatTableDataSource<Exercise>();
  public displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  public isLoading$: Observable<boolean>;

  public ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.select(fromTraining.getCompletedExercises).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedExercises();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  public doFilter(event: any): void {
    this.dataSource.filter = event.currentTarget.value.trim().toLowerCase();
  }

  public ngOnDestroy(): void { }
}
