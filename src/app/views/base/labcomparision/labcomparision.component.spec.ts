import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabcomparisionComponent } from './labcomparision.component';

describe('LabcomparisionComponent', () => {
  let component: LabcomparisionComponent;
  let fixture: ComponentFixture<LabcomparisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabcomparisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabcomparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
