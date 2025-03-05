import {Component, inject, OnInit} from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Contact} from '../../models/contact';
import {ActionButtonComponent} from '../../shared/action-button/action-button.component';
import {Router} from '@angular/router';
import {ContactStore} from '../../core/stores/contact.store';
import {DatePipe} from '@angular/common';
import {Badge} from 'primeng/badge';

@Component({
  selector: 'app-contact-list',
  imports: [
    ButtonModule,
    TableModule,
    ActionButtonComponent,
    DatePipe,
    Badge,
  ],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {

  contactStore = inject(ContactStore)

  async ngOnInit(): Promise<void> {

    this.contacts = await this.contactStore.loadAll() ?? []
  }

  protected route = inject(Router);

  contacts: Contact[] = []


}
