import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({
      url: environment.API_URL + httpRequest.url,
      setHeaders: {
        ContentType: 'application/json',
        // Authorization: `Bearer ${this.authService.sessionToken}`,
      },
    });

    return next.handle(httpRequest);
  }


}
