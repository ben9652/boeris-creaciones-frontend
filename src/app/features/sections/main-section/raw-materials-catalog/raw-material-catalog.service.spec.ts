import { TestBed } from '@angular/core/testing';

import { RawMaterialCatalogService } from './raw-material-catalog.service';

describe('RawMaterialCatalogService', () => {
  let service: RawMaterialCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawMaterialCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
