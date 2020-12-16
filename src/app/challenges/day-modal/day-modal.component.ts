import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
import { DayStatus } from '../day.model';

@Component({
    selector: 'ns-day-modal',
    templateUrl: './day-modal.component.html',
    styleUrls: ['./day-modal.component.css'],
    moduleId: module.id
})
export class DayModalComponent implements OnInit {
    loadedDate: Date;
    loadedStatus: 'complete' | 'fail' = null;
    constructor(private modalParams: ModalDialogParams) {}

    ngOnInit(): void {
        let params = this.modalParams.context as { date: Date; status: DayStatus };
        this.loadedDate = params.date;
        this.loadedStatus =
            params.status === DayStatus.Completed ? 'complete' : params.status === DayStatus.Failed ? 'fail' : null;
    }

    onHandleInput(action: DayStatus) {
        this.modalParams.closeCallback(action);
    }
}
