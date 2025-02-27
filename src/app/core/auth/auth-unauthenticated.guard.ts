import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { inject } from '@angular/core';
import { AuthStore } from './auth.store';

export const authUnauthenticatedGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
