import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import * as fromRoot from 'src/app/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private store: Store<fromRoot.IApplicationState>) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(fromRoot.getIsAuthenticated);
    }

    public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        return this.store.select(fromRoot.getIsAuthenticated);
    }
}
