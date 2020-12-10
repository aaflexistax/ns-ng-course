import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss'],
  moduleId: module.id
})
export class ChallengeActionsComponent implements OnInit {
  @Output() actionSelection = new EventEmitter<'complete' | 'fail' | 'cancel'>();
  @Input() cancelText = 'Cancel';

  constructor() {}

  ngOnInit(): void {}

  onAction(action: 'complete' | 'fail' | 'cancel') {
    this.actionSelection.emit(action);
  }
}
