import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { delay } from 'rxjs/operators';
import { ChallengeService } from '../challenge.service';

@Component({
    selector: 'ns-challenge-tabs',
    templateUrl: './challenge-tabs.component.html',
    styleUrls: ['./challenge-tabs.component.css'],
    moduleId: module.id
})
export class ChallengeTabsComponent implements OnInit {
    isLoading = false;

    constructor(
        private router: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private page: Page,
        private challengeService: ChallengeService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.challengeService
            .fetchCurrentChallenge()

            .subscribe(
                res => {
                    console.log(res);
                    this.isLoading = false;
                    this.loadTabsRoutes();
                },
                err => {
                    console.log(err);
                    this.isLoading = false;
                    this.loadTabsRoutes();
                }
            );

        this.page.actionBarHidden = true;
    }

    loadTabsRoutes() {
        setTimeout(() => {
            this.router.navigate([{ outlets: { currentChallenge: ['current-challenge'], today: ['today'] } }], {
                relativeTo: this.activatedRoute
            });
        }, 10);
    }
}
