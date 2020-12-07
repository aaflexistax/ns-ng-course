import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptModule, TabViewDirective } from '@nativescript/angular';
import { AppComponent } from './app.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { TodayComponent } from './challenges/today/today.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
import { ChallengeTabsComponent } from './challenges/challenge-tabs/challenge-tabs.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    CurrentChallengeComponent,
    ChallengeEditComponent,
    AuthComponent,
    TodayComponent,
    ActionBarComponent,
    ChallengeTabsComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
