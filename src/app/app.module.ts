import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { TodayComponent } from './challenges/today/today.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        SharedModule,
        NativeScriptHttpClientModule
    ],
    entryComponents: [DayModalComponent],
    declarations: [AppComponent, DayModalComponent, TodayComponent],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
