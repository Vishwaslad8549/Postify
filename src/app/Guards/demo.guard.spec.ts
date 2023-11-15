import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { demoGuard } from './demo.guard';

describe('demoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => demoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
