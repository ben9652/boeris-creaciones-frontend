import { afterRender, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { DeviceTypeService } from './core/services/device-type/device-type.service';
import { ActiveRouteService } from './core/services/active-route/active-route.service';
import { StorageService } from './core/services/storage/storage.service';
import { filter } from 'rxjs';

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
  viewportHeight: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private deviceTypeService: DeviceTypeService,
    private storageService: StorageService,
    private activeRouteService: ActiveRouteService,
    private activatedRoute: ActivatedRoute
  ) {
    afterRender(() => {
      deviceTypeService.isMobile();
    });

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if(typeof window !== "undefined") {
        this.viewportHeight = window.innerHeight;
        console.log(window.innerHeight);
      }
      this.router.events.subscribe((event) => {
        if(event instanceof NavigationEnd) {
          this.activeRouteService.setRoute(event.url);
        }
      })
    }
    
  }
}