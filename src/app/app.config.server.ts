import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { SESSION_STORAGE } from './tokens';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: SESSION_STORAGE,
      useFactory: () => ({
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {}
      })
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
