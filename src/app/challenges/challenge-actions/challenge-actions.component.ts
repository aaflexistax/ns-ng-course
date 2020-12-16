import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DayStatus } from '../day.model';

@Component({
    selector: 'ns-challenge-actions',
    templateUrl: './challenge-actions.component.html',
    styleUrls: ['./challenge-actions.component.scss'],
    moduleId: module.id
})
export class ChallengeActionsComponent implements OnInit, OnChanges {
    @Output() actionSelection = new EventEmitter<DayStatus>();
    @Input() cancelText = 'Cancel';
    @Input() chosen: 'complete' | 'fail' = null;
    action: 'complete' | 'fail' = null;
    done: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.chosen) {
            this.action = changes.chosen.currentValue;
        }
    }

    onAction(action: 'complete' | 'fail' | 'cancel') {
        this.done = true;
        let status = DayStatus.Open;
        if (action === 'complete') {
            status = DayStatus.Completed;
            this.action = 'complete';
        } else if (action === 'fail') {
            status = DayStatus.Failed;
            this.action = 'fail';
        } else if (action === 'cancel') {
            this.done = false;
        }

        this.actionSelection.emit(status);
    }
}
