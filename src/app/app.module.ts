import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptModule } from '@nativescript/angular';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { AppComponent } from './app.component';
import { StackComponent } from './layouts/stack/stack.component';
import { FlexComponent } from './layouts/flex/flex.component';
import { GridComponent } from './layouts/grid/grid.component';
import { AbsoluteComponent } from './layouts/absolute/absolute.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptFormsModule],
  declarations: [
    AppComponent,
    CurrentChallengeComponent,
    StackComponent,
    FlexComponent,
    GridComponent,
    AbsoluteComponent,
    ChallengeEditComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
