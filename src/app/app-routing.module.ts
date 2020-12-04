import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [{ path: '' }];

@NgModule({
  imports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
