import { Component, Inject } from '@angular/core';

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snack-bar',
    template: '<span>{{ message }}</span>',
})
export class SnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) { }
}
