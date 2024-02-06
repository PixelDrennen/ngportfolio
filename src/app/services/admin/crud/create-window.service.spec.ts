import { TestBed } from '@angular/core/testing';

import { CreateWindowService } from './create-window.service';

describe('CreateWindowService', () => {
  let service: CreateWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
