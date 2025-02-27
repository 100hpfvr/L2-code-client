import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from './auth.store';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authStore = inject(AuthStore);
  router = inject(Router);

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authStore.isAuthenticated()) {
      if (this.authStore.isSessionExpired()) {
      }

      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authStore.sessionToken()}`,
        },
      });
    }

    return next.handle(httpRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.ErrorCode === 'TokenInvalid') {
          error.error.message = 'Sua sessão expirou, faça login novamente.';
          this.authStore.removeSession();
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
