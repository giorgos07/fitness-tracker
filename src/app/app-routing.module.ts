import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/welcome/welcome.module').then(x => x.WelcomeModule) },
  { path: 'training', loadChildren: () => import('../app/training/training.module').then(x => x.TrainingModule), canLoad: [AuthGuard] },
  { path: 'account', loadChildren: () => import('../app/auth/auth.module').then(x => x.AuthModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
