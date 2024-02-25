import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewerModalComponent } from './content-viewer-modal.component';

describe('ContentViewerModalComponent', () => {
  let component: ContentViewerModalComponent;
  let fixture: ComponentFixture<ContentViewerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentViewerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentViewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
