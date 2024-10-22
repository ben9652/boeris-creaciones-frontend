import { TestBed } from '@angular/core/testing';

import { BrancesCatalogService } from './brances-catalog.service';

describe('BrancesCatalogService', () => {
  let service: BrancesCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrancesCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
