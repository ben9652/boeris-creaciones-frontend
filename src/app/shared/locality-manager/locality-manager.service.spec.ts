import { TestBed } from '@angular/core/testing';

import { LocalityManagerService } from './locality-manager.service';

describe('LocalityManagerService', () => {
  let service: LocalityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalityManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
