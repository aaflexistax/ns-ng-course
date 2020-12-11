import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../../shared/shared.module';
import { ChallengeEditComponent } from './challenge-edit.component';

@NgModule({
  imports: [
    SharedModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([{ path: '', component: ChallengeEditComponent }]),
    NativeScriptFormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ChallengeEditComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeEditModule {}
