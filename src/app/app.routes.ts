import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Página Principal'},
    loadComponent: () =>
      import('./pages/contact-list/contact-list.component').then((c) => c.ContactListComponent),
  },
  {path: '**', redirectTo: '/notfound'},
];

