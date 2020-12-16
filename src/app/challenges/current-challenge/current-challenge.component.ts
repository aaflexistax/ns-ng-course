import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from '@nativescript/angular';
import { UIService } from '../../shared/ui/ui.service';

import { DayModalComponent } from '../day-modal/day-modal.component';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';
import { Subscription } from 'rxjs';
import { Day, DayStatus } from '../day.model';

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challeng.component.html',
    styleUrls: ['./current-challeng.component.scss'],
    moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    currentChallenge: Challenge;

    private currentChallengeSub: Subscription;

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private challengeService: ChallengeService
    ) {}

    ngOnInit() {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe(cc => {
            this.currentChallenge = cc;
        });
    }

    ngOnDestroy() {
        if (this.currentChallengeSub) {
            this.currentChallengeSub.unsubscribe();
        }
    }

    getIsSettable(dayInMonth: number) {
        return dayInMonth <= new Date().getDate();
    }

    onChangeStatus(day: Day) {
        if (!this.getIsSettable(day.dayInMonth)) return;
        this.modalDialog
            .showModal(DayModalComponent, {
                fullscreen: true,
                viewContainerRef: this.uiService.getRouteVCRef() ? this.uiService.getRouteVCRef() : this.vcRef,
                context: { date: day.date, status: day.status },
                animated: true
            })
            .then((status: DayStatus) => {
                if (status === DayStatus.Open) return;
                this.challengeService.updateDayStatus(day.dayInMonth, status);
            });
    }

    getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
        return startRow + weekRow + irregularRow;
    }
}
