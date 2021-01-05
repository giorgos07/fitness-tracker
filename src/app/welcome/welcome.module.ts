import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
    declarations: [
        WelcomeComponent
    ],
    imports: [
        FlexLayoutModule,
        WelcomeRoutingModule
    ]
})
export class WelcomeModule { }
