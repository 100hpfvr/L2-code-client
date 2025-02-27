import {Component, inject} from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Contact} from '../../models/contact';
import {ActionButtonComponent} from '../../shared/action-button/action-button.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-list',
  imports: [
    ButtonModule,
    TableModule,
    ActionButtonComponent,
  ],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent {
  protected route = inject(Router);

  contacts: Contact[] = []


}
