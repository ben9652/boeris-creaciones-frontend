import { TestBed } from '@angular/core/testing';

import { ListRawMaterialsService } from './list-raw-materials.service';

describe('ListRawMaterialsService', () => {
  let service: ListRawMaterialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListRawMaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
