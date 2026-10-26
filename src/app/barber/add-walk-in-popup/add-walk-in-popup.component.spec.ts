import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalkInPopupComponent } from './add-walk-in-popup.component';

describe('AddWalkInPopupComponent', () => {
  let component: AddWalkInPopupComponent;
  let fixture: ComponentFixture<AddWalkInPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWalkInPopupComponent]
    });
    fixture = TestBed.createComponent(AddWalkInPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
