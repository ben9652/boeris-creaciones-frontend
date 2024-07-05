import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mobileAccessGuard } from './mobile-access.guard';

describe('mobileAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mobileAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
