import {Injectable} from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactRepository {
  private contacts: Contact[] = [];
  private nextId: number = 1;

  // Create
  create(contact: Omit<Contact, 'id'>): Contact {
    const newContact: Contact = {id: this.nextId++, ...contact};
    this.contacts.push(newContact);
    return newContact;
  }

  // Read all
  getAll(): Contact[] {
    return [...this.contacts];
  }

  // Read by ID
  getById(id: number): Contact | undefined {
    return this.contacts.find((contact) => contact.id === id);
  }

  // Update
  update(id: number, updatedContact: Partial<Omit<Contact, 'id'>>): Contact | undefined {
    const contactIndex = this.contacts.findIndex((contact) => contact.id === id);
    if (contactIndex >= 0) {
      const existingContact = this.contacts[contactIndex];
      this.contacts[contactIndex] = {...existingContact, ...updatedContact};
      return this.contacts[contactIndex];
    }
    return undefined;
  }

  // Delete
  delete(id: number): boolean {
    const initialLength = this.contacts.length;
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    return this.contacts.length < initialLength;
  }
}
