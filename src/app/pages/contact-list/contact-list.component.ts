import { Component } from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Contact} from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  imports: [
    ButtonModule,
    TableModule,
  ],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent {

  contacts: Contact[] = []


}
