import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCreatorWindowComponent } from './text-creator-window.component';

describe('TextCreatorWindowComponent', () => {
  let component: TextCreatorWindowComponent;
  let fixture: ComponentFixture<TextCreatorWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextCreatorWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextCreatorWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
