import { Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CommonModule, Location } from '@angular/common';

@Component({
    selector: 'app-main-banner',
    imports: [
        TranslateModule,
        ButtonModule,
        OverlayPanelModule,
        UserMenuComponent,
        CommonModule
    ],
    templateUrl: './main-banner.component.html',
    styleUrl: './main-banner.component.scss'
})
export class MainBannerComponent {
  menuVisible: ModelSignal<boolean> = model(false);
  isDeployableMenu: InputSignal<boolean> = input<boolean>(true);
  title: InputSignal<string> = input<string>('Boeri\'s Creaciones');
  user_edition: InputSignal<boolean> = input<boolean>(true);
  
  constructor(
    public translateService: TranslateService,
    private location: Location
  ) {
    
  }

  onClickLeftBanner() {
    if(this.isDeployableMenu()) {
      this.menuVisible.set(!this.menuVisible());
    }
    else {
      this.location.back();
    }
  }
}
