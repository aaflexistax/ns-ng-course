import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from '@nativescript/angular';
import { UIService } from '../../shared/ui/ui.service';

import { DayModalComponent } from '../day-modal/day-modal.component';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challeng.component.html',
  styleUrls: ['./current-challeng.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit {
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  days: { dayInMonth: number; dayInWeek: number }[] = [];
  private currentYear = new Date().getFullYear();
  private currentMonth = new Date().getMonth();

  constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef, private uiService: UIService) {}

  ngOnInit() {
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    for (let i = 1; i < daysInMonth + 1; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const dayInWeek = date.getDay();
      this.days.push({ dayInMonth: i, dayInWeek });
    }
  }

  onChangeStatus() {
    this.modalDialog
      .showModal(DayModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRouteVCRef() ? this.uiService.getRouteVCRef() : this.vcRef,
        context: { date: new Date() },
        animated: true
      })
      .then((action: string) => {
        console.log(action);
      });
  }

  getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
    return startRow + weekRow + irregularRow;
  }
}
