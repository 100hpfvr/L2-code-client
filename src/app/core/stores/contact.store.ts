import {inject} from "@angular/core";
import {signalStore, withState, withMethods, patchState, withComputed, withHooks} from "@ngrx/signals";
import {Contact} from '../../models/contact';
import {ContactService} from '../services/contact.service';


export type ContacFilter = "all" | "favorite" | "not favorite"
export type ContactStore = Contact
const initialState: ContactStore = {
  nome: '',
  email: '',
  telefone: '',
  favorito: 'N',
  id: 0,
  ativo: 'S',
  celular: null,
  dataCadastro: new Date()
}

export const ContactStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, contactService = inject(ContactService)) => ({

    async loadAll() {
      patchState(store, )
      const contacts = await contactService.getAll()
      return contacts.data
    },
    async setFavorite(contact: Contact) {
      contact.favorito = contact.favorito === 'S' ? 'N' : 'S'
      const updatedContact = await contactService.updateFavorite(contact)
      return this.loadAll()
    },
    patchContactData(contactData: Contact) {
      patchState(store, contactData);
    },
    async addContact(contact: Contact) {
      await contactService.create(contact)
      return this.loadAll()
    }
  })),
)
