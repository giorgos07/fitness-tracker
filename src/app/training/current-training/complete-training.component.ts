import { Component } from '@angular/core';

@Component({
    selector: 'app-complete-training',
    template: `
        <h1 mat-dialog-title>Congratulations</h1>
        <mat-dialog-content>
            <p>You have successfully completed the exercise.</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-raised-button
                    color="primary"
                    mat-dialog-close>
                Save and continue
            </button>
        </mat-dialog-actions>
    `
})
export class CompleteTrainingComponent { }
