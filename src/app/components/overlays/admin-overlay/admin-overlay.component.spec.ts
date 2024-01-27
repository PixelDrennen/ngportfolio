import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOverlayComponent } from './admin-overlay.component';

describe('AdminOverlayComponent', () => {
  let component: AdminOverlayComponent;
  let fixture: ComponentFixture<AdminOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
