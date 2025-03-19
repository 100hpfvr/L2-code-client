import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {L2Material} from '../assets/theme/L2Material';
import {ApplicationInterceptor} from './core/middlewares/application.interceptor';
import {LoadingInterceptor} from './core/middlewares/loading.interceptor';
import {provideNgxMask} from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplicationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNgxMask(),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: L2Material,
        options: {
          darkModeSelector: 'light',
          cssLayer: true
        }

      }
    })
  ]
};
