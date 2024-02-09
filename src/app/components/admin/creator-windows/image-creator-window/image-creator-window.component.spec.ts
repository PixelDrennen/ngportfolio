import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCreatorWindowComponent } from './image-creator-window.component';

describe('ImageCreatorWindowComponent', () => {
  let component: ImageCreatorWindowComponent;
  let fixture: ComponentFixture<ImageCreatorWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageCreatorWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageCreatorWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
