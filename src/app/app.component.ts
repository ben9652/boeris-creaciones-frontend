import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslateService } from './services/custom-translate.service';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

// En esta versión se importarán los iconos que necesite cada componente. De esta manera evitamos una sobrecarga innecesaria.
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    ButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'boeris-creaciones-frontend';
  faCoffee: IconDefinition = faCoffee

  constructor(
    private translateService: CustomTranslateService
  ) {

  }

  // Uso de NgxTranslate en archivo TS
  async ngOnInit(): Promise<void> {
    let translatedText: string | undefined;
    translatedText = await this.translateService.getTranslation('TITLE');
    console.log('Título pero con Translate: ', translatedText);
  }
}