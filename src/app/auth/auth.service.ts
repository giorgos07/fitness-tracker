import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthData } from 'src/app/auth/auth-data.model';
import { UiService } from 'src/app/shared/ui.service';
import * as Auth from './auth.actions';
import * as fromRoot from 'src/app/app.reducer';
import * as Ui from 'src/app/shared/ui.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private router: Router,
        private fireAuth: AngularFireAuth,
        private uiService: UiService,
        private store: Store<fromRoot.IApplicationState>) { }

    public initAuthListener(): void {
        this.fireAuth.authState.subscribe((user: any) => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/account/login']);
            }
        });
    }

    public register(authData: AuthData): void {
        this.store.dispatch(new Ui.StartLoading());
        this.fireAuth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(_ => {
                this.store.dispatch(new Ui.StopLoading());
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/account/login']);
            })
            .catch((error: any) => {
                this.store.dispatch(new Ui.StopLoading());
                this.uiService.showSnackBar(error.message);
            });
    }

    public login(authData: AuthData): void {
        this.store.dispatch(new Ui.StartLoading());
        this.fireAuth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(_ => {
                this.store.dispatch(new Ui.StopLoading());
            })
            .catch((error: any) => {
                this.store.dispatch(new Ui.StopLoading());
                this.uiService.showSnackBar(error.message);
            });
    }

    public logout(): void {
        this.fireAuth.signOut();
    }
}
