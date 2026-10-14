import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicePopUpFormComponent } from './add-service-pop-up-form.component';

describe('AddServicePopUpFormComponent', () => {
  let component: AddServicePopUpFormComponent;
  let fixture: ComponentFixture<AddServicePopUpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddServicePopUpFormComponent]
    });
    fixture = TestBed.createComponent(AddServicePopUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
