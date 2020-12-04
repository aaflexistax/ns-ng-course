import { Component, Input } from '@angular/core';
import { ItemEventData } from '@nativescript/core';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challeng.component.html',
  styleUrls: ['./current-challeng.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {
  @Input() challengesList: string[] = [];

  onItemTap(args: ItemEventData) {
    console.log(args);
  }
}
