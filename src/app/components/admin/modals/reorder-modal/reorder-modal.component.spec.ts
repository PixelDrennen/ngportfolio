import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderModalComponent } from './reorder-modal.component';

describe('ReorderModalComponent', () => {
  let component: ReorderModalComponent;
  let fixture: ComponentFixture<ReorderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReorderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReorderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
