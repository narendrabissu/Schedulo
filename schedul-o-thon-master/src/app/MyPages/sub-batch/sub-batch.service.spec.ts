import { TestBed } from '@angular/core/testing';

import { SubBatchService } from './sub-batch.service';

describe('SubBatchService', () => {
  let service: SubBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
