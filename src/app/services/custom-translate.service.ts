import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateService {

  constructor(
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('es');
    translateService.use('es');
  }

  async getTranslation(key: string): Promise<string | undefined> {
    return await firstValueFrom(this.translateService.get(key));
  }
}
