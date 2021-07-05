import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabsComponent } from './view-labs.component';

describe('ViewLabsComponent', () => {
  let component: ViewLabsComponent;
  let fixture: ComponentFixture<ViewLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
