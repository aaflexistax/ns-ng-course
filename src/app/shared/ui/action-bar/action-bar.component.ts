import { Component, Input } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isAndroid, Page } from '@nativescript/core';
import { UIService } from '../ui.service';

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id
})
export class ActionBarComponent {
  @Input() title = '';
  @Input() showBackButton = true;

  constructor(private page: Page, private router: RouterExtensions, private uiService: UIService) {}
  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  get android() {
    return isAndroid;
  }

  onGoBack = () => this.router.backToPreviousPage();

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

  onToggleButton() {
    this.uiService.toggleDrawer();
  }
}
