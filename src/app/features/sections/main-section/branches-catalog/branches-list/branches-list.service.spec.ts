import { TestBed } from '@angular/core/testing';

import { BranchesListService } from './branches-list.service';

describe('BranchesListService', () => {
  let service: BranchesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
