import { afterRender, ChangeDetectorRef, Component, DoCheck, model, ModelSignal, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.entities';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { DataAccessService } from '../../../../core/services/data-access/data-access.service';

@Component({
    selector: 'app-menu-sidebar',
    imports: [
        PanelMenuModule,
        DrawerModule
    ],
    templateUrl: './menu-sidebar.component.html',
    styleUrl: './menu-sidebar.component.scss'
})
export class MenuSidebarComponent implements OnInit, DoCheck {
  user: User | null | undefined;
  partnerRoles: string[] | null | undefined;

  sideMenu: MenuItem[] = [];

  menuOpened: ModelSignal<boolean> = model<boolean>(false);

  constructor(
    private translateService: TranslateService,
    private dataAccessService: DataAccessService
  ) {
    this.user = this.dataAccessService.getUser();
    this.partnerRoles = this.dataAccessService.getRoles();

    if(this.partnerRoles === null) {
      this.partnerRoles = [];
    }
    
    if(this.user && this.partnerRoles) {
      if(this.user.role === 'a' || this.user.role === 's') {
        let raw_materials_catalog: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.RAW_MATERIALS'),
          icon: 'fas fa-leaf',
          routerLink: ['raw-materials-catalog']
        };
        let products_catalog: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PRODUCTS'),
          icon: 'fas fa-cube',
          routerLink: ['products-catalog']
        };
        let providers_catalog: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PROVIDERS'),
          icon: 'fas fa-user-tie',
          routerLink: ['providers-catalog']
        };
        let branches_catalog: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.BRANCHES'),
          icon: 'fas fa-store',
          routerLink: ['branches-catalog']
        };
  
        let purchases: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PURCHASES'),
          icon: 'fas fa-cart-shopping',
          routerLink: ['purchases'],
          expanded: false
        };
        let productions: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PRODUCTIONS'),
          icon: 'fas fa-industry',
          routerLink: ['productions'],
          expanded: false
        };
    
        let raw_materials_labour: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.RAW_MATERIALS'),
          icon: 'fas fa-leaf',
          routerLink: ['raw-materials-labour']
        }
        let products_labour: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.LEVEL1.PRODUCTS'),
          icon: 'fas fa-cube',
          routerLink: ['products-labour']
        }
        
        let home: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.HOME'),
          icon: 'fas fa-house',
          routerLink: ['home'],
          expanded: true
        };
        this.sideMenu.push(home);
  
        if(this.user.role === 'a' || (this.user.role === 's' && this.partnerRoles.includes('sa'))) {
          let catalogs: MenuItem = {
            label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.CATALOGS'),
            icon: 'fas fa-book-open',
            items: [
              raw_materials_catalog,
              products_catalog,
              providers_catalog,
              branches_catalog
            ]
          };
          let partners: MenuItem = {
            label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.PARTNERS'),
            icon: 'fas fa-users',
            routerLink: ['partners'],
            expanded: false
          };
  
          this.sideMenu.push(catalogs, partners);
        }
  
        if(this.user.role === 'a' || (this.user.role === 's' && (this.partnerRoles.includes('sa') || this.partnerRoles.includes('ss')))) {
          let provisions: MenuItem = {
            label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.PROVISIONS'),
            icon: 'fas fa-box-open',
            items: [
              purchases,
              productions
            ]
          }
  
          this.sideMenu.push(provisions);
        }
  
        if(this.user.role === 'a' || (this.user.role === 's' && (this.partnerRoles.includes('sa') || this.partnerRoles.includes('se')))) {
          let manufacture: MenuItem = {
            label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.MANUFACTURE'),
            icon: 'fas fa-screwdriver-wrench',
            items: [
              raw_materials_labour,
              products_labour
            ]
          };
  
          this.sideMenu.push(manufacture);
        }
  
        let accounting: MenuItem = {
          label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.ACCOUNTING'),
          icon: 'fas fa-chart-line',
          routerLink: ['accounting-book'],
          expanded: false
        };
        this.sideMenu.push(accounting);
  
        if(this.user.role === 'a' || (this.user.role === 's' && (this.partnerRoles.includes('sa') || this.partnerRoles.includes('sl')))) {
          let store: MenuItem = {
            label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.STORE'),
            icon: 'fas fa-warehouse',
            routerLink: ['storage'],
            expanded: false
          };
  
          this.sideMenu.push(store);
        }
  
        if(this.user.role === 'a' || (this.user.role === 's' && (this.partnerRoles.includes('sa') || this.partnerRoles.includes('sv') || this.partnerRoles.includes('sr')))) {
          let sales: MenuItem = {
            label: this.translateService.instant('SECTIONS.SIDEBAR.ROOT.SALES'),
            icon: 'fas fa-cart-arrow-down',
            routerLink: ['sales'],
            expanded: false
          };
          
          this.sideMenu.push(sales);
        }
      }
    }
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
  }
}
