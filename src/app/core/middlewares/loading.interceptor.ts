import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (request.headers.has('Skip-Interceptor')) {
      const headers = request.headers.delete('Skip-Interceptor');
      return next.handle(request.clone({ headers }));
    }

    this.totalRequests++;

    if (this.totalRequests >= 1) {
      this.spinner.show();
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
