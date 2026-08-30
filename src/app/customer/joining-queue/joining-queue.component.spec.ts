import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningQueueComponent } from './joining-queue.component';

describe('JoiningQueueComponent', () => {
  let component: JoiningQueueComponent;
  let fixture: ComponentFixture<JoiningQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoiningQueueComponent]
    });
    fixture = TestBed.createComponent(JoiningQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
