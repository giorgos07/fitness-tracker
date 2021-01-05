import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IApplicationState>) { }

  public maxDate: Date = new Date();
  public isLoading$: Observable<boolean>;

  public ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  public onSignup(form: NgForm): void {
    this.authService.register({
      email: form.value.email,
      password: form.value.password
    });
  }

  public ngOnDestroy(): void { }
}
