import { TestBed } from '@angular/core/testing';

import { EditWindowService } from './edit-window.service';

describe('EditWindowService', () => {
  let service: EditWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
