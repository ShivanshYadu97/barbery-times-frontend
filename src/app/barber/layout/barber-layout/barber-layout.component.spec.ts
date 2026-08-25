import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberLayoutComponent } from './barber-layout.component';

describe('BarberLayoutComponent', () => {
  let component: BarberLayoutComponent;
  let fixture: ComponentFixture<BarberLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarberLayoutComponent]
    });
    fixture = TestBed.createComponent(BarberLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
