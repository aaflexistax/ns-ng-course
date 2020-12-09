import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from '@nativescript/angular';
import { UIService } from '../../shared/ui/ui.service';

import { DayModalComponent } from '../day-modal/day-modal.component';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challeng.component.html',
  styleUrls: ['./current-challeng.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {
  constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef, private uiService: UIService) {}

  onChangeStatus() {
    this.modalDialog
      .showModal(DayModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRoutVCRef() ? this.uiService.getRoutVCRef() : this.vcRef,
        context: { date: new Date() }
      })
      .then((action: string) => {
        console.log(action);
      });
  }
}
