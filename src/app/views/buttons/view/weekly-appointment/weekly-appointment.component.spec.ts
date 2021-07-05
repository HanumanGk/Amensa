import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAppointmentComponent } from './weekly-appointment.component';

describe('WeeklyAppointmentComponent', () => {
  let component: WeeklyAppointmentComponent;
  let fixture: ComponentFixture<WeeklyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
