import { Component } from '@angular/core';

import { isAndroid, Page } from '@nativescript/core';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challeng.component.html',
  styleUrls: ['./current-challeng.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {
  constructor(private page: Page) {}

  onLoadedActionBar() {
    if (isAndroid) {
      const androidToolbar = this.page.actionBar.nativeView;
      const backButton = androidToolbar.getNavigationIcon();
      if (backButton) {
        backButton.setColorFilter(
          android.graphics.Color.parseColor('#171717'),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    }
  }
}
