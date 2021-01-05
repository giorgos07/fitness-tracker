import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidenavListComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        MatToolbarModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        HeaderComponent,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        MatToolbarModule,
        SidenavListComponent
    ]
})
export class SharedModule { }
