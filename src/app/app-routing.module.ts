import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { AuthComponent } from './auth/auth.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { ChallengeTabsComponent } from './challenges/challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { TodayComponent } from './challenges/today/today.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'today', component: TodayComponent },
  { path: 'current-challenge', component: CurrentChallengeComponent },
  { path: 'edit-challenge', component: ChallengeEditComponent },
  { path: 'challenges', component: ChallengeTabsComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
