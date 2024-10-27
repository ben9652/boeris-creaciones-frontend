import { TestBed } from '@angular/core/testing';

import { BranchesCatalogService } from './brances-catalog.service';

describe('BrancesCatalogService', () => {
  let service: BranchesCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchesCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
