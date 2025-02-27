import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Página Principal'},
    loadComponent: () =>
      import('./pages/layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/contact-list/contact-list.component').then(
            (c) => c.ContactListComponent
          ),
        // canActivate: [authGuard],
        children: [],
      }
    ]
  },
  {path: '**', redirectTo: '/notfound'},
];

