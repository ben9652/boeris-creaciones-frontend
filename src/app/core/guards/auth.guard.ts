import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const LoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated: boolean = auth.checkAuthentication();
  if(isAuthenticated) {
    router.navigate(['/login']);
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
