import { Component } from '@angular/core';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
  moduleId: module.id
})
export class AppComponent {
  enteredChallenges: string = '';

  onChallengeInput(input: string) {
    if (input === '') return;
    this.enteredChallenges = input;
  }
}
