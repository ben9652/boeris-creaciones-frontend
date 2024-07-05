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
import { RolesComponent } from './features/sections/main-section/partners/roles/roles.component';
import { mobileAccessGuard } from './core/guards/mobile-access.guard';
import { PartnerAdditionComponent } from './features/sections/main-section/partners/partner-addition/partner-addition.component';

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
                redirectTo: 'home',
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
                component: PartnersComponent,
                children: [
                    {
                        path: 'roles/:id',
                        component: RolesComponent,
                        canActivate: [mobileAccessGuard]
                    },
                    {
                        path: 'addition',
                        component: PartnerAdditionComponent,
                        canActivate: [mobileAccessGuard]
                    }
                ]
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
        path: 'profile',
        component: EditProfileComponent
    }
];
