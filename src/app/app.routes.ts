import {Routes} from '@angular/router';
import {authGuard} from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    data: {breadcrumb: 'Página Principal'},
    loadComponent: () =>
      import('./pages/layout/app.layout.component').then((c) => c.AppLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/contact-list/contact-list.component').then(
            (c) => c.ContactListComponent
          ),
        canActivate: [authGuard],
        children: [],
      },]
    //   {
    //     path: 'controle-lotes',
    //     loadComponent: () =>
    //       import('./modules/batches-control/batches-control.component').then(
    //         (c) => c.BatchesControlComponent
    //       ),
    //     data: {breadcrumb: 'Controle de lotes'},
    //     canActivate: [authGuard],
    //     children: [],
    //   },
    //   {
    //     path: 'error',
    //     loadComponent: () =>
    //       import('./modules/auth/error/error.component').then((m) => m.ErrorComponent),
    //     // canActivate: [authGuard],
    //   },
    //   {
    //     path: 'access',
    //     loadComponent: () =>
    //       import('./modules/auth/accessdenied/accessdenied.component').then(
    //         (m) => m.AccessdeniedComponent
    //       ),
    //     canActivate: [authGuard],
    //   },
    //   {
    //     path: 'forgotpassword',
    //     loadComponent: () =>
    //       import('./modules/auth/forgotpassword/forgotpassword.component').then(
    //         (m) => m.ForgotPasswordComponent
    //       ),
    //   },
    //   {
    //     path: 'nova-senha',
    //     loadComponent: () =>
    //       import('./modules/auth/newpassword/newpassword.component').then(
    //         (m) => m.NewPasswordComponent
    //       ),
    //   },
    // ],
  },
  // {
  //   path: 'notfound',
  //   loadComponent: () =>
  //     import('./modules/notfound/notfound.component').then(
  //       (c) => c.NotfoundComponent
  //     ),
  // },
  {path: '**', redirectTo: '/notfound'},
];

