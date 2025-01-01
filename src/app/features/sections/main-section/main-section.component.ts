import { afterRender, Component, effect, signal, WritableSignal } from '@angular/core';

import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

import { TranslateService } from '@ngx-translate/core';
import { MainBannerComponent } from './main-banner/main-banner.component';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RawMaterialsCatalogComponent } from './raw-materials-catalog/raw-materials-catalog.component';
import { ProductsCatalogComponent } from './products-catalog/products-catalog.component';
import { ProvidersCatalogComponent } from './providers-catalog/providers-catalog.component';
import { BranchesCatalogComponent } from './branches-catalog/branches-catalog.component';
import { PartnersComponent } from './partners/partners.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { RawMaterialsLabourComponent } from './raw-materials-labour/raw-materials-labour.component';
import { ProductsLabourComponent } from './products-labour/products-labour.component';
import { AccountingComponent } from './accounting/accounting.component';
import { StorageComponent } from './storage/storage.component';
import { SalesComponent } from './sales/sales.component';
import { ActiveRouteService } from '../../../core/services/active-route/active-route.service';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../core/services/storage/storage.service';
import { DataAccessService } from '../../../core/services/data-access/data-access.service';
import { User } from '../../../core/models/user.entities';

export enum ActiveSection {
  HOME,
  RAW_MATERIALS_CATALOG,
  PRODUCTS_CATALOG,
  PROVIDERS_CATALOG,
  BRANCHES_CATALOG,
  PARTNERS,
  PURCHASES,
  RAW_MATERIALS_MANUFACTURE,
  PRODUCTS_MANUFACTURE,
  ACCOUNTING,
  STORE,
  SALES,
}

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [
    MainBannerComponent,
    MenuSidebarComponent,
    RouterModule
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent {
  activeSection = ActiveSection;
  activeSectionEnum = ActiveSection.HOME;

  menuOpened: WritableSignal<boolean> = signal(false);

  constructor(
    private translateService: TranslateService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private activeRouteService: ActiveRouteService
  ) {
    
  }
}
