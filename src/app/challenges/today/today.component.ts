import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onActionSelected(action: 'complete' | 'fail' | 'cancel') {
    console.log(action);
  }
}
