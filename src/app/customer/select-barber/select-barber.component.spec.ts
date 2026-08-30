import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBarberComponent } from './select-barber.component';

describe('SelectBarberComponent', () => {
  let component: SelectBarberComponent;
  let fixture: ComponentFixture<SelectBarberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBarberComponent]
    });
    fixture = TestBed.createComponent(SelectBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
