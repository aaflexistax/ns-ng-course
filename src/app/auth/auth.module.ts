import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptModule,
    NativeScriptRouterModule
} from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SharedModule,
        NativeScriptRouterModule.forChild([{ path: '', component: AuthComponent }])
    ],
    declarations: [AuthComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
