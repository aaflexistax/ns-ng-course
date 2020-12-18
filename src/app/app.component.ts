import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { Subscription } from 'rxjs';
import { UIService } from './shared/ui/ui.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
    moduleId: module.id
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    enteredChallenges: string = '';
    drawerSub: Subscription;
    private drawer: RadSideDrawer;
    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawerComponent.sideDrawer.toggleDrawerState();
            }
        });

        this.uiService.setRootVCRef(this.vcRef);
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;

        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

    onChallengeInput(input: string) {
        if (input === '') return;
        this.enteredChallenges = input;
    }

    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
    }
}
