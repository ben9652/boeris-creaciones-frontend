import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  // Create env
  const env = new EnvService();

  // Read environment variables from browser window
  const browserWindow = window || {};
  const index: any = '__env';

  // FIXME error con indice no numerico
  const browserWindowEnv = browserWindow[index] || {};

  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
        
    }
  }
  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
