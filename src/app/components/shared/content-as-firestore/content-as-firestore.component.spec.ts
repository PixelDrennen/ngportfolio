import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAsFirestoreComponent } from './content-as-firestore.component';

describe('ContentAsFirestoreComponent', () => {
  let component: ContentAsFirestoreComponent;
  let fixture: ComponentFixture<ContentAsFirestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentAsFirestoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentAsFirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
