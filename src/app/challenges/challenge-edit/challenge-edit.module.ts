import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SharedModule } from '../../shared/shared.module';
import { ChallengeEditComponent } from './challenge-edit.component';

@NgModule({
  imports: [
    SharedModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([{ path: '', component: ChallengeEditComponent }])
  ],
  declarations: [ChallengeEditComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeEditModule {}
