import { Component } from '@angular/core';

import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

import { TranslateService } from '@ngx-translate/core';
import { MainBannerComponent } from './main-banner/main-banner.component';
import { ActivatedRoute, Router } from '@angular/router';
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
    HomeComponent,
    RawMaterialsCatalogComponent,
    ProductsCatalogComponent,
    ProvidersCatalogComponent,
    BranchesCatalogComponent,
    PartnersComponent,
    PurchasesComponent,
    RawMaterialsLabourComponent,
    ProductsLabourComponent,
    AccountingComponent,
    StorageComponent,
    SalesComponent,
    PanelMenuModule,
    SidebarModule
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent {
  activeSection = ActiveSection;
  activeSectionEnum = ActiveSection.HOME;
  
  sideMenu: MenuItem[] = [];

  selectedNode: MenuItem = {};

  constructor(
    private translateService: TranslateService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    let raw_materials_catalog: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.LEVEL1.RAW_MATERIALS'),
      icon: 'fas fa-leaf',
      routerLink: ['raw-materials-catalog']
    };
    let products_catalog: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PRODUCTS'),
      icon: 'fas fa-cube',
      routerLink: ['products-catalog']
    };
    let providers_catalog: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PROVIDERS'),
      icon: 'fas fa-user-tie',
      routerLink: ['providers-catalog']
    };
    let branches_catalog: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.LEVEL1.BRANCHES'),
      icon: 'fas fa-store',
      routerLink: ['branches-catalog']
    };

    let raw_materials_labour: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.LEVEL1.RAW_MATERIALS'),
      icon: 'fas fa-leaf',
      routerLink: ['raw-materials-labour']
    }
    let products_labour: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PRODUCTS'),
      icon: 'fas fa-cube',
      routerLink: ['products-labour']
    }
    
    let home: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.HOME'),
      icon: 'fas fa-house',
      routerLink: ['home'],
      expanded: true
    };
    let catalogs: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.CATALOGS'),
      icon: 'fas fa-book-open',
      items: [
        raw_materials_catalog,
        products_catalog,
        providers_catalog,
        branches_catalog
      ]
    };
    let partners: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.PARTNERS'),
      icon: 'fas fa-users',
      routerLink: ['partners'],
      expanded: false
    };
    let purchases: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.PURCHASES'),
      icon: 'fas fa-cart-shopping',
      routerLink: ['purchases'],
      expanded: false
    };
    let manufacture: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.MANUFACTURE'),
      icon: 'fas fa-screwdriver-wrench',
      items: [
        raw_materials_labour,
        products_labour
      ]
    };
    let accounting: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.ACCOUNTING'),
      icon: 'fas fa-chart-line',
      routerLink: ['accounting-book'],
      expanded: false
    };
    let store: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.STORE'),
      icon: 'fas fa-warehouse',
      routerLink: ['storage'],
      expanded: false
    };
    let sales: MenuItem = {
      label: translateService.instant('SECTIONS.SIDEBAR.ROOT.SALES'),
      icon: 'fas fa-cart-arrow-down',
      routerLink: ['sales'],
      expanded: false
    };
    
    this.sideMenu.push(home, catalogs, partners, purchases, manufacture, accounting, store, sales);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.navigate(['home'], { relativeTo: this.activatedRoute });
  }
}
