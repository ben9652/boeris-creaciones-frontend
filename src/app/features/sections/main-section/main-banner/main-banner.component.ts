import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-main-banner',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonModule,
    OverlayPanelModule,
    UserMenuComponent
  ],
  templateUrl: './main-banner.component.html',
  styleUrl: './main-banner.component.scss'
})
export class MainBannerComponent {
  constructor(
    public translateService: TranslateService
  ) {

  }
}
