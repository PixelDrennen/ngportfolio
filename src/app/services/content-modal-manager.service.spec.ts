import { TestBed } from '@angular/core/testing';

import { ContentModalManagerService } from './content-modal-manager.service';

describe('ContentModalManagerService', () => {
  let service: ContentModalManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentModalManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
