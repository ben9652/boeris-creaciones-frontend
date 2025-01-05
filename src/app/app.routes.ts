import { Routes } from '@angular/router';
import { AuthGuard, LoggedInGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/user/login/login.component';
import { MainSectionComponent } from './features/sections/main-section/main-section.component';
import { HomeComponent } from './features/sections/main-section/home/home.component';
import { mobileAccessGuard } from './core/guards/mobile-access.guard';
import { inject } from '@angular/core';
import { ActiveRouteService } from './core/services/active-route/active-route.service';

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
                loadComponent: () => import('./features/sections/main-section/raw-materials-catalog/raw-materials-catalog.component').then(m => m.RawMaterialsCatalogComponent)
            },
            {
                path: 'products-catalog',
                loadComponent: () => import('./features/sections/main-section/products-catalog/products-catalog.component').then(m => m.ProductsCatalogComponent)
            },
            {
                path: 'providers-catalog',
                loadComponent: () => import('./features/sections/main-section/providers-catalog/providers-catalog.component').then(m => m.ProvidersCatalogComponent)
            },
            {
                path: 'branches-catalog',
                loadComponent: () => import('./features/sections/main-section/branches-catalog/branches-catalog.component').then(m => m.BranchesCatalogComponent)
            },
            {
                path: 'partners',
                loadComponent: () => import('./features/sections/main-section/partners/partners.component').then(m => m.PartnersComponent)
            },
            {
                path: 'purchases',
                loadComponent: () => import('./features/sections/main-section/purchases/purchases.component').then(m => m.PurchasesComponent)
            },
            {
                path: 'productions',
                loadComponent: () => import('./features/sections/main-section/productions/productions.component').then(m => m.ProductionsComponent)
            },
            {
                path: 'raw-materials-labour',
                loadComponent: () => import('./features/sections/main-section/raw-materials-labour/raw-materials-labour.component').then(m => m.RawMaterialsLabourComponent)
            },
            {
                path: 'products-labour',
                loadComponent: () => import('./features/sections/main-section/products-labour/products-labour.component').then(m => m.ProductsLabourComponent)
            },
            {
                path: 'accounting-book',
                loadComponent: () => import('./features/sections/main-section/accounting/accounting.component').then(m => m.AccountingComponent)
            },
            {
                path: 'storage',
                loadComponent: () => import('./features/sections/main-section/storage/storage.component').then(m => m.StorageComponent)
            },
            {
                path: 'sales',
                loadComponent: () => import('./features/sections/main-section/sales/sales.component').then(m => m.SalesComponent)
            }
        ],
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/user/edit-profile/edit-profile.component').then(m => m.EditProfileComponent),
    },
    {
        path: 'roles-edition',
        loadComponent: () => import('./features/sections/sub-sections/roles-edition/roles-edition.component').then(m => m.RolesEditionComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'partner-addition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-partner-addition/mobile-partner-addition.component').then(m => m.MobilePartnerAdditionComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'raw-material-addition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-raw-material-data/mobile-raw-material-data.component').then(m => m.MobileRawMaterialDataComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'raw-material-edition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-raw-material-data/mobile-raw-material-data.component').then(m => m.MobileRawMaterialDataComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'product-addition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-product-data/mobile-product-data.component').then(m => m.MobileProductDataComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'product-edition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-product-data/mobile-product-data.component').then(m => m.MobileProductDataComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'provider-addition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-provider-data/mobile-provider-data.component').then(m => m.MobileProviderDataComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'provider-edition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-provider-data/mobile-provider-data.component').then(m => m.MobileProviderDataComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'branch-addition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-branch-data/mobile-branch-data.component').then(m => m.MobileBranchDataComponent),
        canActivate: [mobileAccessGuard]
    },
    {
        path: 'branch-edition',
        loadComponent: () => import('./features/sections/sub-sections/mobile-branch-data/mobile-branch-data.component').then(m => m.MobileBranchDataComponent),
        canActivate: [mobileAccessGuard]
    }
];
