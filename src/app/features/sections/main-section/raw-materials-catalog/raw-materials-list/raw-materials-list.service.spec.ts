import { TestBed } from '@angular/core/testing';

import { RawMaterialsListService } from './raw-materials-list.service';

describe('RawMaterialListService', () => {
  let service: RawMaterialsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawMaterialsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
