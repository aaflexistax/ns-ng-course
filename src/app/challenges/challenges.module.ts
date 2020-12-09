import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';

@NgModule({
  imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule],
  declarations: [ChallengeTabsComponent, CurrentChallengeComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengesModule {}
