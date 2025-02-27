import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from './auth.service';

export const authAdminGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated ) {
    if (!authService.isSessionExpired) {
      return true;
    }
    authService.removeLocalSessionToken();
  }

  router.navigate(['/admin'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
