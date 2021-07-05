import { TestBed } from '@angular/core/testing';

import { AuthLoggedinGuard } from './auth-loggedin.guard';

describe('AuthLoggedinGuard', () => {
  let guard: AuthLoggedinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLoggedinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
