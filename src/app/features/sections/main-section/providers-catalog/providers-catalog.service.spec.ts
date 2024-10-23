import { TestBed } from '@angular/core/testing';

import { ProvidersCatalogService } from './providers-catalog.service';

describe('ProvidersCatalogService', () => {
  let service: ProvidersCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
