import {Component, inject, OnInit} from '@angular/core';
import {Button, ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Contact} from '../../models/contact';
import {ActionButtonComponent} from '../../shared/action-button/action-button.component';
import {Router} from '@angular/router';
import {ContactStore} from '../../core/stores/contact.store';
import {DatePipe} from '@angular/common';
import {Badge} from 'primeng/badge';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NewContactDialogComponent} from './new-contact-dialog/new-contact-dialog.component';
import {MessageService} from 'primeng/api';

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
  providers: [DialogService, MessageService]
})
export class ContactListComponent implements OnInit {

  contactStore = inject(ContactStore)

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService, public messageService: MessageService) {
  }

  async ngOnInit(): Promise<void> {

    this.contacts = await this.contactStore.loadAll() ?? []
  }

  protected route = inject(Router);

  contacts: Contact[] = []

  openContactModal(contact?: Contact) {
    this.ref = this.dialogService.open(NewContactDialogComponent, {
        header: 'Adicionar Contato',
        width: '50vw',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
      }
    )
    this.ref.onClose.subscribe(async (contact: Contact) => {
      if (contact) {
        await this.contactStore.addContact(contact)
        this.messageService.add({severity: 'info', summary: 'Contato Salvo', detail: contact?.nome});
      }
    });


  }

}
