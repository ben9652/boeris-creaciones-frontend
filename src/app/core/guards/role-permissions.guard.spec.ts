import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rolePermissionsGuard } from './role-permissions.guard';

describe('rolePermissionsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rolePermissionsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
