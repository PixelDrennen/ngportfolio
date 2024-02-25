import { TestBed } from '@angular/core/testing';

import { DataSnapshotsService } from './data-snapshots.service';

describe('DataSnapshotsService', () => {
  let service: DataSnapshotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSnapshotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
