import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabsComponent } from './add-labs.component';

describe('AddLabsComponent', () => {
  let component: AddLabsComponent;
  let fixture: ComponentFixture<AddLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
