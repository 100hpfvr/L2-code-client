import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from './auth.store';

export const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated()) {
    if (!authStore.isSessionExpired()) {
      return true;
    }
    authStore.removeSession();
  }

  // se não logado retorna para página de login.
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
