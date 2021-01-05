import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from 'src/app/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IApplicationState>) { }

  @Output() public sidenavClosed = new EventEmitter<void>();
  public isAuthenticated$: Observable<boolean>;

  public ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  public onLogout(): void {
    this.sidenavClosed.emit();
    this.authService.logout();
  }

  public ngOnDestroy(): void { }
}
