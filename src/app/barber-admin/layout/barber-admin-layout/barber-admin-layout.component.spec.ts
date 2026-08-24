import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberAdminLayoutComponent } from './barber-admin-layout.component';

describe('BarberAdminLayoutComponent', () => {
  let component: BarberAdminLayoutComponent;
  let fixture: ComponentFixture<BarberAdminLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarberAdminLayoutComponent]
    });
    fixture = TestBed.createComponent(BarberAdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
