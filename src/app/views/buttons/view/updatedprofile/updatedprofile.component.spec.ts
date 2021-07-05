import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedprofileComponent } from './updatedprofile.component';

describe('UpdatedprofileComponent', () => {
  let component: UpdatedprofileComponent;
  let fixture: ComponentFixture<UpdatedprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
