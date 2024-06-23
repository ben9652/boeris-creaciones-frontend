import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'boeris-creaciones-frontend';
  apiUrl?: string; // Ejemplo de uso de una variable de entorno
  viewportHeight: number = 0;

  constructor(
    // private translateService: CustomTranslateService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.apiUrl = environment.API_URL;
  }

  // Uso de NgxTranslate en archivo TS
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if(typeof window !== "undefined") {
        this.viewportHeight = window.innerHeight;
        console.log(window.innerHeight);
      }
    }
  }
}