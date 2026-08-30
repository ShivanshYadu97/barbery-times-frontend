import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConfirmComponent } from './review-confirm.component';

describe('ReviewConfirmComponent', () => {
  let component: ReviewConfirmComponent;
  let fixture: ComponentFixture<ReviewConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewConfirmComponent]
    });
    fixture = TestBed.createComponent(ReviewConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
