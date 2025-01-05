import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveRouteService } from '../services/active-route/active-route.service';

export const LoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const activeRoute = inject(ActiveRouteService);

  const isAuthenticated: boolean = auth.checkAuthentication();

  if(isAuthenticated) {
    const route = activeRoute.route;
    router.navigate([route]);
    return false;
  }
  
  return true;
};

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  const isAuthenticated: boolean = auth.checkAuthentication();

  if(isAuthenticated) {
    return true;
  }
  else {
    router.navigate(['login']);
    return false;
  }
};
