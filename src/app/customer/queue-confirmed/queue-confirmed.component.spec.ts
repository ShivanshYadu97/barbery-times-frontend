import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueConfirmedComponent } from './queue-confirmed.component';

describe('QueueConfirmedComponent', () => {
  let component: QueueConfirmedComponent;
  let fixture: ComponentFixture<QueueConfirmedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueueConfirmedComponent]
    });
    fixture = TestBed.createComponent(QueueConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
