import { TestBed } from '@angular/core/testing';

import { PrimecrudService } from './primecrud.service';

describe('PrimecrudService', () => {
  let service: PrimecrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimecrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
