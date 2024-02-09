import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideooCreatorWindowComponent } from './videoo-creator-window.component';

describe('VideooCreatorWindowComponent', () => {
  let component: VideooCreatorWindowComponent;
  let fixture: ComponentFixture<VideooCreatorWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideooCreatorWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideooCreatorWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
