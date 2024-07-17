import { TestBed } from '@angular/core/testing';

import { ListPartnersService } from './list-partners.service';

describe('ListPartnersService', () => {
  let service: ListPartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
