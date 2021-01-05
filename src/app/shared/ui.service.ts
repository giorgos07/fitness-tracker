import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { SnackBarComponent } from 'src/app/shared/components/snackbar.component';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    constructor(private snackBarService: MatSnackBar) { }

    public loadingStateChanged = new Subject<boolean>();

    public showSnackBar(message: string): void {
        this.snackBarService.openFromComponent(SnackBarComponent, {
            data: message
        });
    }
}
