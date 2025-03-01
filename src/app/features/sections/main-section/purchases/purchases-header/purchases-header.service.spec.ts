import { TestBed } from '@angular/core/testing';

import { PurchasesHeaderService } from './purchases-header.service';

describe('PurchasesHeaderService', () => {
  let service: PurchasesHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
