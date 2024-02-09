import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOptionBoxComponent } from './content-option-box.component';

describe('ContentOptionBoxComponent', () => {
  let component: ContentOptionBoxComponent;
  let fixture: ComponentFixture<ContentOptionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentOptionBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentOptionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
