import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  type OnInit,
} from '@angular/core';
import { ActionButtonService } from './actionButtonService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'action-button',
  template: `
    <ng-template #actionButtonTemplate>
      <section class="flex gap-3">
        <ng-content></ng-content>
      </section>
    </ng-template>
  `,
  styleUrls: ['./action-button.component.css'],
  standalone: true,
})
export class ActionButtonComponent implements OnInit, OnDestroy {
  @ViewChild('actionButtonTemplate', { static: true })
  actionButtonTemplate!: TemplateRef<any>;

  /**
   * @description Rota que o botão deve ser exibido ''
   * @example '/atualizar-funcionario/incluir-funcionario'
   * irá aparecer em incluir-funcionario
   */
  @Input({ required: true }) route?: string;

  private routeSubscription?: Subscription;

  constructor(
    public actionButtonService: ActionButtonService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    // this.routeSubscription = this.router.events.pipe().subscribe(() => {
      this.handlerAction();
    // });
  }

  private handlerAction() {
    const currentRoute = this.router.routerState.snapshot.url;
    if (currentRoute == (this.route as string)) {
      this.actionButtonService.setButtonTemplateReference(
        this.actionButtonTemplate
      );
    } else {
      this.actionButtonService.dispose();
    }
  }

  ngOnDestroy(): void {
    this.actionButtonService.dispose();
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
