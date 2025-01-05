import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RequestResponseInterceptor } from './core/interceptors/requests-response.interceptor';
import { ActiveRouteService } from './core/services/active-route/active-route.service';
import { SESSION_STORAGE } from './tokens';
import { isPlatformServer } from '@angular/common';
import { BoerisCreaciones } from './theme/boeris-creaciones-preset';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/i18n/', '.json');
}

export function initializeApp(
  translateService: TranslateService,
  router: Router
) {
  return () => {    
    translateService.setDefaultLang('es');
    return translateService.use('es');
  }
}

const translateProviders = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([RequestResponseInterceptor])
    ),
    importProvidersFrom(HttpClient, translateProviders),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslateService, Router, ActiveRouteService],
      multi: true
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    {
      provide: SESSION_STORAGE,
      useFactory: (platformId: object) => {
        if(isPlatformServer(platformId)) {
          return {};
        }
        return sessionStorage;
      },
      deps: [PLATFORM_ID]
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BoerisCreaciones,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    })
  ]
};
