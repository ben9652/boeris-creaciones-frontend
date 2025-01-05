import { CanActivateFn } from '@angular/router';

export const rolePermissionsGuard: CanActivateFn = (route, state) => {
  return true;
};
