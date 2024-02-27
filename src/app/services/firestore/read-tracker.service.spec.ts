import { TestBed } from '@angular/core/testing';

import { ReadTrackerService } from './read-tracker.service';

describe('ReadTrackerService', () => {
  let service: ReadTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
