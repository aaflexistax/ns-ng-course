import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChallengeService } from '../challenge.service';
import { Day, DayStatus } from '../day.model';

@Component({
    selector: 'ns-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy {
    currentDay: Day;
    private currentChallengeSub: Subscription;
    constructor(public challengeService: ChallengeService) {}

    ngOnInit(): void {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe(ch => {
            if (ch) {
                this.currentDay = ch.currentDay;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.currentChallengeSub) {
            this.currentChallengeSub.unsubscribe();
        }
    }

    onActionSelected(action: DayStatus) {
        this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action);
    }

    getActionName() {
        if (this.currentDay.status === DayStatus.Completed) {
            return 'complete';
        } else if (this.currentDay.status === DayStatus.Failed) {
            return 'fail';
        }
    }
}
