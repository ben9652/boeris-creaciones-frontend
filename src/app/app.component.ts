import { afterRender, ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DeviceTypeService } from './core/services/device-type/device-type.service';
import { ActiveRouteService } from './core/services/active-route/active-route.service';
import { StorageService } from './core/services/storage/storage.service';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DataAccessService } from './core/services/data-access/data-access.service';
import { LoginComponent } from './features/user/login/login.component';

@Component({
    selector: 'app-root',
    imports: [
      CommonModule,
      RouterOutlet,
      ButtonModule,
      SkeletonModule,
      LoginComponent
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
    private activeRouteService: ActiveRouteService,
    private dataAccessService: DataAccessService
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
        if(event instanceof NavigationStart) {
          this.isLoading = true;
        }
        if(event instanceof NavigationEnd) {
          this.activeRouteService.setRoute(event.url);
          this.waitForComponentLoad().then(() => this.isLoading = false);
        }
      })
    }
  }

  private waitForComponentLoad(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  public isLoggedIn(): boolean {
    return this.dataAccessService.getToken() !== null;
  }
}