import {inject} from "@angular/core";
import {signalStore, withState, withMethods, patchState, withComputed, withHooks} from "@ngrx/signals";
import {Contact} from '../../models/contact';
import {ContactService} from '../services/contact.service';


export type ContacFilter = "all" | "favorite" | "not favorite"
export type ContactStore = {
  contacts: Contact[];
  loading: boolean,
  filter: ContacFilter

}

const initialState: ContactStore = {
  contacts: [],
  loading: false,
  filter: "all"
}

export const ContactStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, contactService = inject(ContactService)) => ({

    async loadAll() {
      patchState(store, {loading: true})
      const contacts = await contactService.getAll()
      return contacts.data
    }
  })),
)
