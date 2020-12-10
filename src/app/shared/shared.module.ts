import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ChallengeActionsComponent } from '../challenges/challenge-actions/challenge-actions.component';
import { ActionBarComponent } from './ui/action-bar/action-bar.component';

@NgModule({
  imports: [CommonModule, NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: [ActionBarComponent, ChallengeActionsComponent],
  exports: [ActionBarComponent, ChallengeActionsComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
