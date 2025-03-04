import { TestBed } from '@angular/core/testing';

import { HeaderInterfaceService } from './header-interface.service';

describe('HeaderInterfaceService', () => {
  let service: HeaderInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
