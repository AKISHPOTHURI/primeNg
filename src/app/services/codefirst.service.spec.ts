import { TestBed } from '@angular/core/testing';

import { CodefirstService } from './codefirst.service';

describe('CodefirstService', () => {
  let service: CodefirstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodefirstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
