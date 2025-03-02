import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AppBreadcrumbComponent } from './breadcrumb/app.breadcrumb.component';
import { RenderActionButtonComponent } from './render-action-button/render-action-button.component';
import {ActionButtonService} from '../../../shared/action-button/actionButtonService.service';
import {LayoutService} from '../layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.component.scss',
    imports: [ RenderActionButtonComponent]
})
export class AppTopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  private actionButtonService = inject(ActionButtonService);

  constructor(public layoutService: LayoutService) {}

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }
}
