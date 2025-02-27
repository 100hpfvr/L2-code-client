import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionButtonService} from '../../../../shared/action-button/actionButtonService.service';

@Component({
    selector: 'render-action-button',
    imports: [CommonModule],
    template: `
    @if(this.actionButtonService.buttonTemplateReference!){
    <ng-container
      *ngTemplateOutlet="this.actionButtonService.buttonTemplateReference!"
    >
    </ng-container
    >}
  `,
    styleUrls: ['./render-action-button.component.css'],
  standalone: true,
})
export class RenderActionButtonComponent {
  teste: any;
  @ViewChild('actionButtonTemplate', { static: true })
  actionButtonTemplate!: TemplateRef<any>;
  constructor(public actionButtonService: ActionButtonService) {}
}
