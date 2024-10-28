import { TestBed } from '@angular/core/testing';

import { RawMaterialsCatalogService } from './raw-materials-catalog.service';

describe('RawMaterialsCatalogService', () => {
  let service: RawMaterialsCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawMaterialsCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
