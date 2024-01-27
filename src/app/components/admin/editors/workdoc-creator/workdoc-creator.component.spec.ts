import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdocCreatorComponent } from './workdoc-creator.component';

describe('WorkdocCreatorComponent', () => {
  let component: WorkdocCreatorComponent;
  let fixture: ComponentFixture<WorkdocCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdocCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkdocCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
