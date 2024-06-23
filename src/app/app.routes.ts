import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { AuthGuard, LoggedInGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/sections/home/home.component';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [LoggedInGuard],
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
    }
];
