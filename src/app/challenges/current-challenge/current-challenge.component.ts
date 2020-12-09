import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

import { isAndroid, Page } from '@nativescript/core';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challeng.component.html',
  styleUrls: ['./current-challeng.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {
  constructor(private router: RouterExtensions) {}

  onEdit() {
    this.router.navigate(['/challenges/edit'], {
      transition: {
        name: 'slideLeft'
      }
    });
  }
}
