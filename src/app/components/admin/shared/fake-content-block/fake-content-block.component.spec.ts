import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeContentBlockComponent } from './fake-content-block.component';

describe('FakeContentBlockComponent', () => {
  let component: FakeContentBlockComponent;
  let fixture: ComponentFixture<FakeContentBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeContentBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FakeContentBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
