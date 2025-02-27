import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../app.layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class AppMenuComponent {
  constructor(private layoutService: LayoutService) {
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }

  model: any[] = [];


}
