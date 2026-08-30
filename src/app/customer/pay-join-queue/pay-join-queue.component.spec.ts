import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayJoinQueueComponent } from './pay-join-queue.component';

describe('PayJoinQueueComponent', () => {
  let component: PayJoinQueueComponent;
  let fixture: ComponentFixture<PayJoinQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayJoinQueueComponent]
    });
    fixture = TestBed.createComponent(PayJoinQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
