import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ActionBarComponent } from './ui/action-bar/action-bar.component';

@NgModule({
  imports: [CommonModule, NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent]
})
export class SharedModule {}
