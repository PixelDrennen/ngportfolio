import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentWindowComponent } from './edit-content-window.component';

describe('EditContentWindowComponent', () => {
  let component: EditContentWindowComponent;
  let fixture: ComponentFixture<EditContentWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditContentWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditContentWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
