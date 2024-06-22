import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'boeris-creaciones-frontend';
  apiUrl?: string; // Ejemplo de uso de una variable de entorno
  translatedTitle?: string;

  constructor(
    public translateService: TranslateService
  ) {
    this.apiUrl = environment.API_URL; // Ejemplo de uso de variable de entorno
    this.translatedTitle = translateService.instant('TITLE');
  }

  // Uso de NgxTranslate en archivo TS
  ngOnInit() {
    
  }
}