import { Routes } from '@angular/router';
import { AuthGuard, LoggedInGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/user/login/login.component';
import { MainSectionComponent } from './features/sections/main-section/main-section.component';
import { HomeComponent } from './features/sections/main-section/home/home.component';
import { RawMaterialsCatalogComponent } from './features/sections/main-section/raw-materials-catalog/raw-materials-catalog.component';
import { ProductsCatalogComponent } from './features/sections/main-section/products-catalog/products-catalog.component';
import { ProvidersCatalogComponent } from './features/sections/main-section/providers-catalog/providers-catalog.component';
import { BranchesCatalogComponent } from './features/sections/main-section/branches-catalog/branches-catalog.component';
import { PartnersComponent } from './features/sections/main-section/partners/partners.component';
import { PurchasesComponent } from './features/sections/main-section/purchases/purchases.component';
import { RawMaterialsLabourComponent } from './features/sections/main-section/raw-materials-labour/raw-materials-labour.component';
import { ProductsLabourComponent } from './features/sections/main-section/products-labour/products-labour.component';
import { AccountingComponent } from './features/sections/main-section/accounting/accounting.component';
import { StorageComponent } from './features/sections/main-section/storage/storage.component';
import { SalesComponent } from './features/sections/main-section/sales/sales.component';
import { EditProfileComponent } from './features/user/edit-profile/edit-profile.component';
import { mobileAccessGuard } from './core/guards/mobile-access.guard';
import { RolesEditionComponent } from './features/sections/sub-sections/roles-edition/roles-edition.component';
import { inject } from '@angular/core';
import { ActiveRouteService } from './core/services/active-route.service';
import { MobilePartnerAdditionComponent } from './features/sections/sub-sections/mobile-partner-addition/mobile-partner-addition.component';
import { MobileRawMaterialDataComponent } from './features/sections/sub-sections/mobile-raw-material-data/mobile-raw-material-data.component';
import { MobileProductDataComponent } from './features/sections/sub-sections/mobile-product-data/mobile-product-data.component';
import { MobileProviderDataComponent } from './features/sections/sub-sections/mobile-provider-data/mobile-provider-data.component';
import { MobileBranchDataComponent } from './features/sections/sub-sections/mobile-branch-data/mobile-branch-data.component';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [LoggedInGuard],
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'sections',
        pathMatch: 'full'
    },
    {
        path: 'sections',
        canActivate: [AuthGuard],
        component: MainSectionComponent,
        children: [
            {
                path: '',
                redirectTo: () => {
                    const activeRouteService = inject(ActiveRouteService);
                    const route: string | null = activeRouteService.route;
                    if(route !== null) {
                        const routes: string[] = route.split('/');
                        if(routes[1] === 'sections') {
                            return routes[2];
                        }
                        // else {
                        //     return `/${routes[1]}`;
                        // }
                    }
                    return 'home';
                },
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'raw-materials-catalog',
                component: RawMaterialsCatalogComponent
            },
            {
                path: 'products-catalog',
                component: ProductsCatalogComponent
            },
            {
                path: 'providers-catalog',
                component: ProvidersCatalogComponent
            },
            {
                path: 'branches-catalog',
                component: BranchesCatalogComponent
            },
            {
                path: 'partners',
                component: PartnersComponent
            },
            {
                path: 'purchases',
                component: PurchasesComponent
            },
            {
                path: 'raw-materials-labour',
                component: RawMaterialsLabourComponent
            },
            {
                path: 'products-labour',
                component: ProductsLabourComponent
            },
            {
                path: 'accounting-book',
                component: AccountingComponent
            },
            {
                path: 'storage',
                component: StorageComponent
            },
            {
                path: 'sales',
                component: SalesComponent
            }
        ],
    },
    {
        path: 'roles-edition',
        component: RolesEditionComponent,
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'partner-addition',
        component: MobilePartnerAdditionComponent,
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'profile',
        component: EditProfileComponent
    },
    {
        path: 'raw-material-addition',
        component: MobileRawMaterialDataComponent
    },
    {
        path: 'raw-material-edition',
        component: MobileRawMaterialDataComponent
    },
    {
        path: 'product-addition',
        component: MobileProductDataComponent
    },
    {
        path: 'product-edition',
        component: MobileProductDataComponent
    },
    {
        path: 'provider-addition',
        component: MobileProviderDataComponent
    },
    {
        path: 'provider-edition',
        component: MobileProviderDataComponent
    },
    {
        path: 'branch-addition',
        component: MobileBranchDataComponent
    },
    {
        path: 'branch-edition',
        component: MobileBranchDataComponent
    }
];
