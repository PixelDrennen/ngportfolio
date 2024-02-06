import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentWindowComponent } from './create-content-window.component';

describe('CreateContentWindowComponent', () => {
  let component: CreateContentWindowComponent;
  let fixture: ComponentFixture<CreateContentWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContentWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateContentWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
