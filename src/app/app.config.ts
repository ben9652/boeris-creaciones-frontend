import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RequestResponseInterceptor } from './core/interceptors/requests-response.interceptor';
import { ActiveRouteService } from './core/services/active-route.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/i18n/', '.json');
}

export function initializeApp(
  translateService: TranslateService,
  router: Router,
  activeRouteService: ActiveRouteService
) {
  return () => {
    const currentRoute: string | null = activeRouteService.route;
    if(currentRoute !== null) {
      router.navigateByUrl(currentRoute);
    }
    else {
      router.navigate(['/login']);
    }
    
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
    provideClientHydration()
  ]
};
