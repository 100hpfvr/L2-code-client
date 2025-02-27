import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {L2Material} from '../assets/layout/L2Material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: L2Material,
        options: {
          prefix: 'p',
          darkModeSelector: 'light',
          cssLayer: false
        }

      }
    })
  ]
};
