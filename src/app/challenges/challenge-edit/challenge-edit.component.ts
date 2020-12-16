import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute, RouterExtensions } from '@nativescript/angular';
import { take } from 'rxjs/operators';
import { ChallengeService } from '../challenge.service';

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.scss'],
    moduleId: module.id
})
export class ChallengeEditComponent implements OnInit {
    isCreating = false;
    title = '';
    description = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageRoute: PageRoute,
        private router: RouterExtensions,
        private challengeService: ChallengeService
    ) {}

    ngOnInit() {
        // this.activatedRoute.paramMap.subscribe(paramMap => {
        //   console.log(paramMap.get('mode'));
        // });
        this.pageRoute.activatedRoute.subscribe(activatedRoute =>
            activatedRoute.paramMap.subscribe(paramMap => {
                if (!paramMap.has('mode')) {
                    this.isCreating = true;
                } else {
                    this.isCreating = paramMap.get('mode') !== 'edit';
                }

                if (!this.isCreating) {
                    this.challengeService.currentChallenge.pipe(take(1)).subscribe(ch => {
                        this.title = ch.title;
                        this.description = ch.description;
                    });
                }
            })
        );
    }

    onSubmit(title: string, description: string) {
        this.isCreating
            ? this.challengeService.createNewChallenge(title, description)
            : this.challengeService.updateChallenge(title, description);
        this.router.backToPreviousPage();
    }
}
