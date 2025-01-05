import { afterRender, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DeviceTypeService } from './core/services/device-type/device-type.service';
import { ActiveRouteService } from './core/services/active-route/active-route.service';
import { StorageService } from './core/services/storage/storage.service';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-root',
    imports: [
      CommonModule,
      RouterOutlet,
      ButtonModule,
      SkeletonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  viewportHeight: number = 0;
  isLoading: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(Router) private router: Router,
    private deviceTypeService: DeviceTypeService,
    private storageService: StorageService,
    private activeRouteService: ActiveRouteService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute
  ) {
    afterRender(() => {
      deviceTypeService.isMobile();
    });

    router.events.subscribe((event) => {
      if(event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      }
      else if(event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    })
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