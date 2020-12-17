import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChallengeService } from '../challenge.service';
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
    @Input() startDone = false;
    action: 'complete' | 'fail' = null;
    done: boolean = false;

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.chosen) {
            this.action = changes.chosen.currentValue;
            if (this.action === null) {
                this.done = false;
            }
        }

        if (changes.startDone) {
            if (changes.startDone.currentValue) {
                this.done = true;
            } else {
                this.done = false;
            }
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
