import { TestBed } from '@angular/core/testing';

import { CompaniesListService } from './companies-list.service';

describe('CompaniesListService', () => {
  let service: CompaniesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
