import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberMenuFormComponent } from './barber-menu-form.component';

describe('BarberMenuFormComponent', () => {
  let component: BarberMenuFormComponent;
  let fixture: ComponentFixture<BarberMenuFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarberMenuFormComponent]
    });
    fixture = TestBed.createComponent(BarberMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
