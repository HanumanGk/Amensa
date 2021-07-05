import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookatestComponent } from './bookatest.component';

describe('BookatestComponent', () => {
  let component: BookatestComponent;
  let fixture: ComponentFixture<BookatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookatestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
