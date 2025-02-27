import {inject} from "@angular/core";
import {signalStore, withState, withMethods, patchState, withComputed, withHooks} from "@ngrx/signals";

type ContactState = {
  id: number | null;
  nome: string;
  email: string | null;
  celular: string;
  telefone?: string | null;
  favorito: 'S' | 'N';
  ativo: 'S' | 'N';
  dataCadastro: Date | null;
}

const initialState: ContactState = {
  id: null,
  nome: "",
  email: null,
  celular: "",
  telefone: null,
  favorito: "N",
  ativo: "S",
  dataCadastro: null,
}

export const ContactStore = signalStore(
  {providedIn: 'root'},

  withState(initialState),

  withMethods((store, contactRepository = inject(ContactRepository)) => ({

    save: (contact: Contact) => {
      contactRepository.save(contact);
    },

    }),
  ))
