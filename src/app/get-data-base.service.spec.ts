import { TestBed } from '@angular/core/testing';

import { GetDataBaseService } from './get-data-base.service';

describe('GetDataBaseService', () => {
  let service: GetDataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
