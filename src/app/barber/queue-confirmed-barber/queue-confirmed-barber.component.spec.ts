import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueConfirmedBarberComponent } from './queue-confirmed-barber.component';

describe('QueueConfirmedBarberComponent', () => {
  let component: QueueConfirmedBarberComponent;
  let fixture: ComponentFixture<QueueConfirmedBarberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueConfirmedBarberComponent]
    });
    fixture = TestBed.createComponent(QueueConfirmedBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
