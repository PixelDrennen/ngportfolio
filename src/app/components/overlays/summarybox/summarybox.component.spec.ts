import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryboxComponent } from './summarybox.component';

describe('SummaryboxComponent', () => {
  let component: SummaryboxComponent;
  let fixture: ComponentFixture<SummaryboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
